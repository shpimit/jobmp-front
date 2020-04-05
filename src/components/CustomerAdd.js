import React, { useState }  from 'react'
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { conditionalExpression } from '@babel/types';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: 'none'
    }
}));


export default function CustomerAdd(props) {

    const classes = useStyles();     
    
    const [open, setOpen]           = useState('');    
    const [name, setName]           = useState('');
    const [email, setEmail]         = useState('');
    const [gender, setGender]       = useState('');
    const [grade, setGrade]         = useState('');
    const [like, setLike]           = useState('');
    const [birthday, setBirthday]   = useState('');
    const [skill, setSkill]         = useState('');
    const [eduyn, setEduyn]         = useState('');
    const [project, setProject]     = useState('');
    const [period, setPeriod]       = useState('');
    const [image, setImage]         = useState('');
    const [file, setFile]           = useState('');
    const [fileName, setFileName]   = useState('');



    const handleFormSubmit = (e) => {
        e.preventDefault()
        addCustomer()
        .then((response) => {
            console.log(response.data);
            // Customer(부모 Component)의 state를 갱신함.
            // props.stateRefresh();
        })

        // 데이터를 전송한 이후에는 고객 추가 양식(Form)을 비운 뒤에 페이지를 새로고침(Refresh)하여
        // 등록된 고객 데이터를 확인
        // 실제 배포 버전에서는 전체 페이지를 새로고침 하는 방향으로 코딩을 하면 안 되지만 빠른 테스트를 위해서

        setEmail('');
        setGender('');
        setGrade('');
        setLike('');
        setBirthday('');
        setSkill('');
        setEduyn('');
        setProject('');
        setPeriod('');
        setImage('');
        setFile('');
        setFileName('');
    }

    // const handleValueChange = (e) => {
    //     let nextState = {};
    //     nextState[e.target.name] = e.target.value;
    //     // this.setState(nextState);

    //     console.log(e.target.name);
    //     console.log(e.target.value);  
    // }

    const handleFileChange = (e) =>{


        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");        

        setFile(e.target.files[0]);
        setFileName( e.target.value);

        // this.setState({
        //     file: e.target.files[0],
        //     fileName: e.target.value
        // });
    }    
    

    const addCustomer = () => {

        const url = '/api/customer';

        const formData = new FormData();

        formData.append('image',    file)        
        formData.append('name',     name)
        formData.append('email',    email)
        formData.append('gender',   gender)
        formData.append('grade',    grade)
        formData.append('like',     like)
        formData.append('birthday', birthday)
        formData.append('skill',    skill)
        formData.append('eduyn',    eduyn)
        formData.append('project',  project)
        formData.append('period',   period)
        // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ imageurl이 아닌 file로 했음.         

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setName('');
        setEmail('');
        setGender('');
        setGrade('');
        setLike('');
        setBirthday('');
        setSkill('');
        setEduyn('');
        setProject('');
        setPeriod('');
        setImage('');  
        setFile('');
        setFileName('');
    };      

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
            고객 추가하기
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={file} value={fileName} onChange={handleFileChange} />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                        {fileName === ''? "프로필 이미지 선택" : fileName}
                        </Button>
                    </label><br/>
                <TextField label="이름" type="text" name="name" value={name} onChange={({ target: { value } }) => setName(value)} /><br/>
                <TextField label="이메일" type="text" name="email" value={email} onChange={({ target: { value } }) => setEmail(value)} /><br/>
                <TextField label="성별" type="text" name="gender" value={gender} onChange={({ target: { value } }) => setGender(value)} /><br/>
                <TextField label="등급" type="text" name="grade" value={grade} onChange={({ target: { value } }) => setGrade(value)} /><br/>
                <TextField label="좋아요" type="text" name="like" value={like} onChange={({ target: { value } }) => setLike(value)} /><br/>
                <TextField label="생년월일" type="text" name="birthday" value={birthday} onChange={({ target: { value } }) => setBirthday(value)} /><br/>
                <TextField label="보유기술" type="text" name="skill" value={skill} onChange={({ target: { value } }) => setSkill(value)} /><br/>
                <TextField label="KISA수강" type="text" name="eduyn" value={eduyn} onChange={({ target: { value } }) => setEduyn(value)} /><br/>
                <TextField label="프로젝트" type="text" name="project" value={project} onChange={({ target: { value } }) => setProject(value)} /><br/>
                <TextField label="기간" type="text" name="period" value={period} onChange={({ target: { value } }) => setPeriod(value)} /><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};