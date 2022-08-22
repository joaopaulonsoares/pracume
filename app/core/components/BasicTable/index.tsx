import { useState, MouseEvent, ChangeEvent } from "react"
import Link from "next/link"
import {
  Box,
  Card,
  Grid,
  Divider,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"

function defaultBehavior(id: number) {
  return ""
}

export function BasicTable({ title, subTitle = "", headers, content, editAction }: any) {
  const theme = useTheme()
  const [page, setPage] = useState(2)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  console.log(editAction)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title={title}
            subheader={subTitle}
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={`header-${header.name}`}>{header.name}</TableCell>
                  ))}
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content.map((contItem, index) => (
                  <TableRow key={contItem.id} hover>
                    {headers.map((headerItem) => (
                      <TableCell key={`cell-header-${headerItem.key}`}>
                        {contItem[headerItem.key]}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      <Tooltip placement="top" title="Deletar" arrow>
                        <Link href={editAction(contItem.id)}>
                          <IconButton
                            sx={{
                              "&:hover": {
                                background: theme.colors.error.lighter,
                              },
                              color: theme.palette.error.main,
                            }}
                            color="inherit"
                            size="small"
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Link>
                      </Tooltip>

                      {editAction && (
                        <Link href={editAction(contItem.id)}>
                          <Tooltip placement="top" title="Editar" arrow>
                            <IconButton
                              sx={{
                                "&:hover": {
                                  background: theme.colors.info.lighter,
                                },
                                color: theme.colors.alpha.black[90],
                              }}
                              color="inherit"
                              size="small"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BasicTable
