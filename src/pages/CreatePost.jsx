import React, { useState } from "react";
import Header from "../components/Header";
import { Typography, styled, Box, TextField, Button } from '@mui/material';
import Dropdown from "../components/Dropdown";
import { savePost } from "../services/api";
import { useNavigate } from "react-router-dom";
import { routePath } from "../routes/route";

const Component = styled(Box)({
    background: '#F5F5F5',
    padding: '80px 200px'
});

const Container = styled(Box)({
    display: 'flex',
    margin: 20,
    background: 'white',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 70px',
    '& > p': {
        fontSize: 35,
        fontWeight: 700
    }
});

const FormWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    padding: 20,
    background: 'white',
    borderRadius: 20,
    '& > *': {
        marginTop: '20px !important'
    }
});

const defaultObj = {
    companyName: '',
    personName: '',
    contact: '',
    jobType: '',
    salary: '',
    interviewExperience: '',
    technology: [],
    resourcesLink: ''
};

const options = {
    jobType: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    technology: ['Java', 'JavaScript', 'React', 'Angular', 'Node.js', 'Docker', 'AWS', 'HTML', 'CSS'],
    salary: ['Rs 0-300000', 'Rs 300000-500000', 'Rs 500000-800000', 'Rs 800000-1000000', 'Rs 1000000-1500000', 'Rs 1500000-2000000', 'Rs 2000000 or more']
};

const CreatePost = () => {
    const [data, setData] = useState(defaultObj);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value, type, selectedOptions } = e.target;

        if (type === 'select-multiple') {
            const values = Array.from(selectedOptions, option => option.value);
            setData({ ...data, [name]: values });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const saveJob = async () => {
        await savePost(data);
        navigate(routePath.posts);
    };

    return (
        <>
            <Header />
            <Component style={{backgroundColor:"#142d4c", marginTop:20}}>
                <Container>
                    <Typography>Tell us about your interview experience!</Typography>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH3zkKYlIHjjoQrE4e-a5xiJIaK0reWlcDhewsx8rjV87d8M82" alt="create" />
                </Container>
                <FormWrapper>
                    <TextField
                        placeholder="Company Name"
                        onChange={handleChange}
                        name="companyName"
                        value={data.companyName}
                    />
                    <TextField
                        placeholder="Contact Person Name"
                        onChange={handleChange}
                        name="personName"
                        value={data.personName}
                    />
                    <TextField
                        placeholder="Contact Information"
                        onChange={handleChange}
                        name="contact"
                        value={data.contact}
                    />
                    <Dropdown 
                        id='job-type-label'
                        value={data.jobType}
                        handleChange={handleChange}
                        name="jobType"
                        label="Job Type"
                        options={options.jobType}
                    />
                    <Dropdown 
                        id='salary-label'
                        value={data.salary}
                        handleChange={handleChange}
                        name="salary"
                        label="Salary"
                        options={options.salary}
                    />
                    <TextField
                        placeholder="Describe the interview experience"
                        onChange={handleChange}
                        name="interviewExperience"
                        value={data.interviewExperience}
                        multiline
                        rows={4}
                    />
                    <Dropdown 
                        id='technology-label'
                        value={data.technology}
                        handleChange={handleChange}
                        name="technology"
                        label="Technologies to know "
                        options={options.technology}
                        multiple
                    />
                    <TextField
                        placeholder="Resources Link"
                        onChange={handleChange}
                        name="resourcesLink"
                        value={data.resourcesLink}
                    />
                    <Button variant="contained" onClick={saveJob}>Submit </Button>
                </FormWrapper>
            </Component>
        </>
    );
};

export default CreatePost;