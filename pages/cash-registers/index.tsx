import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getCashRegisters from "app/cash-registers/queries/getCashRegisters";

const ITEMS_PER_PAGE = 100;

export const CashRegistersList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ cashRegisters, hasMore }] = usePaginatedQuery(getCashRegisters, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {cashRegisters.map((cashRegister) => (
          <li key={cashRegister.id}>
            <Link
              href={Routes.ShowCashRegisterPage({
                cashRegisterId: cashRegister.id,
              })}
            >
              <a>{cashRegister.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const CashRegistersPage = () => {
  return (
    <Layout>
      <Head>
        <title>CashRegisters</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCashRegisterPage()}>
            <a>Create CashRegister</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CashRegistersList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default CashRegistersPage;
