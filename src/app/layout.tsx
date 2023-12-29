'use client'
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import ContenClender from '@/app/(routes)/contenclender/page';
import ProviderAndStore from '@/store/provider';
import "react-big-calendar/lib/css/react-big-calendar.css";
// import {addLogin} from '@/slices/authSlice';
// import { useDispatch,useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
// export const metadata = {
//   title: 'Social Watch',
//   description: 'Social Watch',
// };

const DRAWER_WIDTH = 240;
const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'Scheduler', href: '/scheduler', icon: StarIcon },
  { text: 'ContenClender', href: '/contenclender', icon: ScheduleIcon },
  // { text: 'Analytics', href: '/tasks', icon: AnalyticsIcon },
  // {text: 'ContenClender', href: '/contenclender', icon: AnalyticsIcon}
  // { text: 'Analytics', href: '/tasks', icon: AnalyticsIcon },
];

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon },
  { text: 'Support', icon: SupportIcon },
  { text: 'Logout', icon: LogoutIcon },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // const dispatch = useDispatch()
  // const auth = useSelector((state: any) => state.auth)
  const router = useRouter()
  const handleLogout = () => {
    // dispatch(addLogin(false))
    console.log("logout")
    router.push('/')
  }
  return (
    <html lang="en">
      <body>
        <ProviderAndStore>
          <ThemeRegistry>
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
              <Toolbar sx={{ backgroundColor: 'background.paper' }}>
                <DashboardIcon sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }} />
                <Typography variant="h6" noWrap component="div" color="black">
                  Social Watch
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: DRAWER_WIDTH,
                  boxSizing: 'border-box',
                  top: ['48px', '56px', '64px'],
                  height: 'auto',
                  bottom: 0,
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Divider />
              <List>
                {LINKS.map(({ text, href, icon: Icon }) => (
                  <ListItem key={href} disablePadding>
                    <ListItemButton component={Link} href={href}>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ mt: 'auto' }} />
              <List>
                {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => {
                  // if (text === 'Settings') {
                  //   return (
                  //     <ListItem key={text} disablePadding>
                  //       <ListItemButton>
                  //         <ListItemIcon>
                  //           <Icon />
                  //         </ListItemIcon>
                  //         <ListItemText primary={text} />
                  //       </ListItemButton>
                  //     </ListItem>
                  //   )
                  // }
                  // if (text === 'Support') {
                  //   return (
                  //     <ListItem key={text} disablePadding>
                  //       <ListItemButton>
                  //         <ListItemIcon>
                  //           <Icon />
                  //         </ListItemIcon>
                  //         <ListItemText primary={text} />
                  //       </ListItemButton>
                  //     </ListItem>
                  //   )
                  // }
                  if (text === 'Logout') {
                    return (
                      <ListItem key={text} disablePadding>
                        <ListItemButton onClick={handleLogout}>
                          <ListItemIcon>
                            <Icon />
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    )
                  }
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  )
                }

                )}

              </List>

            </Drawer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                ml: `${DRAWER_WIDTH}px`,
                mt: ['48px', '56px', '64px'],
                p: 3,
              }}
            >
              {children}
            </Box>
          </ThemeRegistry>
        </ProviderAndStore>
      </body>
    </html>
  );
}