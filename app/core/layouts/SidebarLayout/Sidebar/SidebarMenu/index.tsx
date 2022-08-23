import { useContext } from "react"
import NextLink from "next/link"
import { ListSubheader, alpha, Box, List, styled, Button, ListItem } from "@mui/material"
import { SidebarContext } from "app/contexts/SidebarContext"

import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone"
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone"
import MmsTwoToneIcon from "@mui/icons-material/MmsTwoTone"
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone"
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone"
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone"
import BeachAccessTwoToneIcon from "@mui/icons-material/BeachAccessTwoTone"
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone"
import FilterVintageTwoToneIcon from "@mui/icons-material/FilterVintageTwoTone"
import HowToVoteTwoToneIcon from "@mui/icons-material/HowToVoteTwoTone"
import LocalPharmacyTwoToneIcon from "@mui/icons-material/LocalPharmacyTwoTone"
import RedeemTwoToneIcon from "@mui/icons-material/RedeemTwoTone"
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone"
import TrafficTwoToneIcon from "@mui/icons-material/TrafficTwoTone"
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone"
import ChromeReaderModeTwoToneIcon from "@mui/icons-material/ChromeReaderModeTwoTone"
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone"
import CameraFrontTwoToneIcon from "@mui/icons-material/CameraFrontTwoTone"
import DisplaySettingsTwoToneIcon from "@mui/icons-material/DisplaySettingsTwoTone"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import BalanceIcon from "@mui/icons-material/Balance"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import EggAltIcon from "@mui/icons-material/EggAlt"
import SportsBarIcon from "@mui/icons-material/SportsBar"
import BallotIcon from "@mui/icons-material/Ballot"
import ReceiptIcon from "@mui/icons-material/Receipt"
import { NavLink } from "app/core/components/NavLink"

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
)

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }

        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }

          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create(["transform", "opacity"])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
)

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext)

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/overview"
                  startIcon={<DesignServicesTwoToneIcon />}
                >
                  Dashboard
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Ponto de Venda
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/teste"
                  startIcon={<AddShoppingCartIcon />}
                >
                  Pedidos
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/dashboards/messenger"
                  startIcon={<BallotIcon />}
                >
                  Comandas
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/dashboards/messenger"
                  startIcon={<BalanceIcon />}
                >
                  Resumo caixa
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/dashboards/messenger"
                  startIcon={<ReceiptIcon />}
                >
                  Notas Fiscais
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Administração
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/management/profile/details"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Vendas
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/management/profile/settings"
                  startIcon={<DisplaySettingsTwoToneIcon />}
                >
                  Estoque
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Gerenciamento
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/ingredients"
                  startIcon={<EggAltIcon />}
                >
                  Ingredientes
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/components/modals"
                  startIcon={<SportsBarIcon />}
                >
                  Bebidas
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/products"
                  startIcon={<FastfoodIcon />}
                >
                  Produtos
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/components/tabs"
                  startIcon={<FilterVintageTwoToneIcon />}
                >
                  Mesas
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/components/badges"
                  startIcon={<HowToVoteTwoToneIcon />}
                >
                  Clientes
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={NavLink}
                  onClick={closeSidebar}
                  to="/components/badges"
                  startIcon={<HowToVoteTwoToneIcon />}
                >
                  Colaboradores
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  )
}

export default SidebarMenu
