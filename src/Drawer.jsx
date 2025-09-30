import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

// import MedicalServicesIcon from "@mui/icons-material/MedicalServices"; // Example icon for Doctors
// import DashboardIcon from "@mui/icons-material/Dashboard";

import DoctorManagement7 from "./Components/DoctorSection/DM7";
import PatientManagement from "./PatientComponents/PatientSection/PatientManagement";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [activeView, setActiveView] = React.useState("dashboard");

  const menuItems = [
    { text: "Dashboard", view: "dashboard" },
    { text: "Doctors", view: "doctors" },
    { text: "Patients", view: "patients" },
    { text: "Appointments", view: "appointments" },
    { text: "Invoices", view: "invoices" },
    { text: "Precriptions", view: "precriptions" },
    { text: "Certificates", view: "certificates" },
    { text: "Procedure & Packages", view: "procedure & packages" },
    { text: "Accounts", view: "accounts" },
    { text: "Human Resources", view: "human resource" },
    { text: "Corporate & Insurance", view: "corporate & insurance" },
    { text: "Referrals", view: "referrals" },
    { text: "Reports", view: "reports" },
    { text: "Settings", view: "settings" },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            HIMS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {
              theme.direction === "rtl"
                ? "me "
                : //   <ChevronRightIcon />
                  "u"
              //   <ChevronLeftIcon />
            }
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => setActiveView(item.view)}
                selected={activeView === item.view}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {index % 2 === 0 ? "inboxICon" : "MailIcon"}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {activeView === "dashboard" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Dashboard
            </Typography>
            <Typography paragraph>
              Welcome to the main dashboard. Content for the dashboard goes
              here.
            </Typography>
          </>
        )}
        {activeView === "doctors" && (
          // When 'doctors' is the active view, render your component
          <DoctorManagement7 />
        )}
        {activeView === "patients" && (
          // When 'patients' is the active view, render your component
          <PatientManagement />
        )}
        {activeView === "appointments" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Appointments
            </Typography>
            <Typography paragraph>Welcome to Appointments</Typography>
          </>
        )}
        {activeView === "invoices" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Invoices
            </Typography>
            <Typography paragraph>Welcome to Invoices</Typography>
          </>
        )}
        {activeView === "precriptions" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Precriptions
            </Typography>
            <Typography paragraph>Welcome to Precriptions.</Typography>
          </>
        )}
        {activeView === "certificates" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Certificates
            </Typography>
            <Typography paragraph>Welcome to Certificates</Typography>
          </>
        )}
        {activeView === "procedure & packages" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Procedure & Packages
            </Typography>
            <Typography paragraph>Welcome to Procedure & Package</Typography>
          </>
        )}
        {activeView === "accounts" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Accoounts
            </Typography>
            <Typography paragraph>Welcome to Accounts</Typography>
          </>
        )}
        {activeView === "human resource" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Human resource
            </Typography>
            <Typography paragraph>Welcome to Human resource</Typography>
          </>
        )}
        {activeView === "corporate & insurance" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Corporate & Insurance
            </Typography>
            <Typography paragraph>
              Welcome to Corporate and insurance
            </Typography>
          </>
        )}
        {activeView === "referrals" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Referrals
            </Typography>
            <Typography paragraph>Welcome to referrals</Typography>
          </>
        )}
        {activeView === "reports" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Reports
            </Typography>
            <Typography paragraph>Welcome to reports</Typography>
          </>
        )}
        {activeView === "settings" && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Settings
            </Typography>
            <Typography paragraph>Welcome to Settings</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
