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
import VisibilityIcon from "@mui/icons-material/Visibility"
import Label from "app/core/components/Label"

export function BasicTable({
  title,
  subTitle = "",
  headers,
  content,
  editAction,
  showAction,
}: any) {
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

  const getStatusLabel = (status: string): JSX.Element => {
    const map = {
      false: {
        text: "Inativo",
        color: "error",
      },
      true: {
        text: "Ativo",
        color: "success",
      },
    }

    const { text, color }: any = map[status]

    return <Label color={color}>{text}</Label>
  }

  function renderCollumType(value: any, type: string) {
    if (type === "badge") {
      return getStatusLabel(value as string)
    }

    return value
  }

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
                    <TableCell align="left" key={`header-${header.name}`}>
                      {header.name}
                    </TableCell>
                  ))}
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content.map((contItem, index) => (
                  <TableRow key={contItem.id} hover>
                    {headers.map((headerItem) => (
                      <TableCell align="left" key={`cell-header-${headerItem.key}`}>
                        {renderCollumType(contItem[headerItem.key], headerItem.type)}
                      </TableCell>
                    ))}
                    <TableCell align="center">
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

                      {showAction && (
                        <Link href={showAction(contItem.id)}>
                          <Tooltip placement="top" title="Visualizar" arrow>
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
                              <VisibilityIcon fontSize="small" />
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
