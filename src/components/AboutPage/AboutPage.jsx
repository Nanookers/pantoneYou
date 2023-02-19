import React from 'react';
import Card from '@mui/material/Card'
import { Avatar } from '@mui/material/';
import {Typography, Grid} from '@mui/material/';
import Stack from '@mui/material/Stack';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}  >
        <Grid>
        <Card sx={{ display: 'flex', backgroundColor: '#f2eaec'}}>
          <Avatar lable='Connor Clark' 
            src='https://media.licdn.com/dms/image/C4D03AQEbkJwwy_snPw/profile-displayphoto-shrink_800_800/0/1590767472827?e=1682553600&v=beta&t=L6c227TT_0lm3Tz9mrqa23ja8QHNA100nmevQtoX4zk'
              sx={{height:'100px', width:'100px', margin:'8px', mt:'20px'}}/>
            <Stack>
              <Typography variant="h3" component="div" sx={{margin:'8px', mr:'30px', mt:'20px'}}>Connor Clark</Typography>
              <Typography variant="h4" component="div" sx={{margin:'8px', mr:'30px', mt:'2px'}}>Full Stack Software Engineer</Typography>
            </Stack>
        </Card>
        <br/>
        <Card sx={{ display: 'flex', alignItems: "center", justifyContent: "center",  backgroundColor: '#f2eaec'}}>
            <Stack>
              <Typography variant="h3" component="div" sx={{margin:'8px', mr:'30px', mt:'10px', display: 'flex', alignItems: "center", justifyContent: "center"
            }}>pantoneYou</Typography>
              <Typography variant="body1" color="text.secondary" sx={{display: 'flex', alignItems: "center", justifyContent: "center", mb:'10px'}}>
                This application was designed for our creative minded, visual artist friends.<br/>
                Designed to limit the cumbersome nature of tracking the location of art, total <br/>
                earnings, and galleries where pieces are most frequently sold in, the idea is to <br/>
                help elliminate piling sales receipts. <br/>
              </Typography>
            </Stack>
        </Card>
        <br/>
        <Card sx={{ display: 'flex', alignItems: "center", justifyContent: "center",  backgroundColor: '#f2eaec'}}>
            <Stack>
              <Typography variant="h3" component="div" sx={{margin:'8px', mr:'30px', mt:'10px', display: 'flex', alignItems: "center", justifyContent: "center"
            }}>Brought To You By:</Typography>  
            
            <Typography variant="h4" color="text.secondary" 
              noWrap sx={{ display: 'flex', alignItems: "center", justifyContent: "center", mb: 1  }}>
              Amazon Web Services
            </Typography>
            <Typography variant="h4" color="text.secondary" 
              noWrap sx={{ display: 'flex', alignItems: "center", justifyContent: "center", mb: 1  }}>
              React
            </Typography>
            <Typography variant="h4" color="text.secondary" 
              noWrap sx={{ display: 'flex', alignItems: "center", justifyContent: "center", mb: 1  }}>
              Material UI
            </Typography>
            <Typography variant="h4" color="text.secondary" 
              noWrap sx={{ display: 'flex', alignItems: "center", justifyContent: "center", mb: 1  }}>
              Redux/Saga
            </Typography>
            <Typography variant="h4" color="text.secondary" 
              noWrap sx={{ display: 'flex', alignItems: "center", justifyContent: "center", mb: 1  }}>
              Postman
            </Typography>
            <Typography variant="h4" color="text.secondary" 
              noWrap sx={{ display: 'flex', alignItems: "center", justifyContent: "center", mb: 1  }}>
              Postgres SQL
            </Typography>
            </Stack>
        </Card>
        </Grid> 
    </div>
  );
}

export default AboutPage;
