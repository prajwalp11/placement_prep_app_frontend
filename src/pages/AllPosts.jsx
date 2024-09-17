import React, { useState, useEffect } from 'react';
import { Box, InputBase, Button, styled, Card, CardContent, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Header from '../components/Header';
import { getAllPosts } from '../services/api';

const SearchContainer = styled(Box)({
    marginTop: 74,
    display: 'flex',
    justifyContent: 'center',
    '& > div': {
        width: 500,
        height: 45,
        border: '1px solid #385170',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        marginRight: 20
    },
    '& > div > div': {
        width: '85%',
        margin: '0 20px'
    }
});

const FindButton = styled(Button)({
    background: '#385170',
    textTransform: 'none',
    height: 45,
    borderRadius: 10,
    width: 100
});

const PostWrapper = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
    '& > div': {
        border: '1px solid #385170',
        borderRadius: 10,
        margin: 10,
        width: '30%',
        height: 'auto',
        minHeight: 300,
    }
});

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getAllPosts();
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);  // Set to empty array if there's an error
            }
        }
        getData();
    }, []);

    return (
        <>
            <Header />
            <SearchContainer style={{marginTop:150}}>
                <Box>
                    <InputBase
                        placeholder='search company name'
                        onChange={(e) => setText(e.target.value)}
                        style={{color : 'white'}}
                    />
                    <SearchIcon style={{color : 'grey'}}/>
                </Box>
                <FindButton variant="contained"><span style={{color : 'white'}}>Find post</span></FindButton>
            </SearchContainer>
            <PostWrapper>
                {posts.filter(post => 
                    post && post.companyName && post.companyName.toLowerCase().includes(text.toLowerCase())
                ).map(post => (
                    <Card key={post._id || Math.random()} style={{backgroundColor : 'lightgrey'}}>
                        <CardContent >
                            <Typography variant="h5">{post.companyName || 'Unknown Company'}</Typography>
                            <Typography><b>Contact:</b> {post.personName || 'N/A'} - {post.contact || 'N/A'}</Typography>
                            <Typography><b>Job Type:</b> {post.jobType || 'N/A'}</Typography>
                            <Typography><b>Salary:</b> {post.salary || 'N/A'}</Typography>
                            <Typography style={{ color: 'black', margin: '10px 0' }}>
                                <b>Interview Experience:</b> {post.interviewExperience ? 
                                    (post.interviewExperience.length > 100 ? 
                                        post.interviewExperience.substring(0, 100) + "..." : 
                                        post.interviewExperience) 
                                    : 'N/A'}
                            </Typography>
                            <Typography><b>Technology:</b> {post.technology ? post.technology.join(', ') : 'N/A'}</Typography>
                            <Typography><b>Resources:</b> {post.resourcesLink ? 
                                <a href={post.resourcesLink} target="_blank" rel="noopener noreferrer">Link</a> 
                                : 'N/A'}
                            </Typography>
                            <Typography style={{ color: '#385170', marginTop: 10 }}>
                                Posted on {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </PostWrapper>
        </>
    );
}

export default AllPosts;