import { useState, MouseEvent, ChangeEvent } from "react"
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
import { format, subHours, subWeeks, subDays } from "date-fns"

export function BasicTable() {
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

  const logs = [
    {
      id: 1,
      browser: " Safari/537.36",
      ipaddress: "3.70.73.142",
      location: "United States",
      date: subDays(new Date(), 2).getTime(),
    },
    {
      id: 2,
      browser: "Chrome/36.0.1985.67",
      ipaddress: "138.13.136.179",
      location: "China",
      date: subDays(new Date(), 6).getTime(),
    },
    {
      id: 3,
      browser: "Googlebot/2.1",
      ipaddress: "119.229.170.253",
      location: "China",
      date: subHours(new Date(), 15).getTime(),
    },
    {
      id: 4,
      browser: "AppleWebKit/535.1",
      ipaddress: "206.8.99.49",
      location: "Philippines",
      date: subDays(new Date(), 4).getTime(),
    },
    {
      id: 5,
      browser: "Mozilla/5.0",
      ipaddress: "235.40.59.85",
      location: "China",
      date: subWeeks(new Date(), 3).getTime(),
    },
  ]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="Access Logs"
            subheader="Recent sign in activity logs"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Browser</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.browser}</TableCell>
                    <TableCell>{log.ipaddress}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>{format(log.date, "dd MMMM, yyyy - h:mm:ss a")}</TableCell>
                    <TableCell align="right">
                      <Tooltip placement="top" title="Deletar" arrow>
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
                      </Tooltip>
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
