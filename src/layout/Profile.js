import React, { useState, useEffect } from 'react';
import Customer from '../components/Customer'
import CustomerAdd from '../components/CustomerAdd';

import Paper            from '@material-ui/core/Paper';
import Table            from '@material-ui/core/Table';
import TableHead        from '@material-ui/core/TableHead';
import TableBody        from '@material-ui/core/TableBody';
import TableRow         from '@material-ui/core/TableRow';
import TableCell        from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { fade }         from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  // root: {
  //   width: "100%",
  //   marginTop: theme.spacing.unit * 3,
  //   overflowX: "auto"
  // },
  // table: {
  //   minWidth: 1080
  // }
  root: {
    width: "100%",
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
}));

export default function Profile({ user }) {

  const [customers, setCustomers] = useState('');
  const [completed, setCompleted] = useState(0);  

  const classes = useStyles();

  const { email, password, name } = user || {};  

  const cellList = ["번호", "프로필 이미지", "이름", "이메일", "성별", "등급", "좋아요", "생년월일", "보유기술", "KISA이수", "프로젝트","기간", "설정"];
  
  const filteredComponents = (data) => {

    console.log(data);

    // data = data.filter((c) => {
    //   return c.name.indexOf(this.state.searchKeyword) > -1;
    // });
    
    /* 맵(Map) 문법은 특정한 리스트(List)가 있을 때 해당 리스트의 각 원소에 특정한 문법을 적용한 결과 리스트를 반환합니다. 다시 말해서 customers 배열에 있는 모든 원소에 대한 Customer Element를 반환하는 것입니다.*/
    return data.map((c) => {                  
      return <Customer stateRefresh={stateRefresh}
        key         = {c.id} 
        id          = {c.id}
        image       = {c.image}
        name        = {c.name}
        email       = {c.email}
        gender      = {c.gender}
        grade       = {c.grade}
        like        = {c.like}
        birthday    = {c.birthday}
        skill       = {c.skill}
        eduyn       = {c.eduyn}
        project     = {c.project}
        period      = {c.period}
      />
    });
  }

  const stateRefresh = () => {

    console.log("stateRefresh");

    callApi()
    .then(res => setCustomers(res))
    .catch(err => console.log(err));

    console.log("stateRefresh End");
  }

  useEffect(() => {

    // timer = setInterval(progress, 20);

    callApi()
    .then(res => {setCustomers(res)})
    .catch(err => console.log(err)); 

    console.log("useEffect");
  }, []);

  // const componentDidMount = () => {
  //   // Circular Progress 라이브러리를 이용하여 프로그레스 바를 API 로딩 메시지 용도로 사용
  //   this.timer = setInterval(this.progress, 20);

  //   this.callApi()
  //   .then(res => this.setState({customers: res}))
  //   .catch(err => console.log(err));
  // }

  const progress = () => {
    // const { completed } = this.state;
    // const { completed } = completed;
    // this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    setCompleted({ completed: completed >= 100 ? 0 : completed + 1 })
  };

  // const componentWillUnmount = () => {
  //   clearInterval(this.timer); 
  // }
  
  const callApi = async () => {

    console.log("hi");
    const response = await fetch('/api/customer');
    const body     = await response.json();
    return body;
  }

  // const handleValueChange = (e) => {
  //   let nextState = {};
  //   nextState[e.target.name] = e.target.value;
  //   setCustomers(nextState);
  //   // setState(nextState);
  // }  

  return (
    <div className={classes.root}>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={useEffect} />
      </div>
      <Paper className={classes.paper}>
        <Table>
        <TableHead>
          <TableRow>
            {cellList.map(c => {
              return <TableCell className={classes.tableHead}>{c}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>            
            {customers ?
              filteredComponents(customers) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={completed} />
                </TableCell> 
              </TableRow> 
            }
          </TableBody>
        </Table>
      </Paper>
    </div>        
    // <>
    //   <h1>Profile</h1>
    //   <dt>Email</dt>
    //   <dd>{email}</dd>
    //   <dt>Password</dt>
    //   <dd>{password}</dd>
    //   <dt>Name</dt>
    //   <dd>{name}</dd>
    // </>
  );
}
