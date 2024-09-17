
import { AppBar, Toolbar, styled } from "@mui/material";
import { routePath } from "../routes/route";
import { Link } from "react-router-dom";

const StyledAppBar = styled(AppBar)({
    background: '#385170',
    height: 90,
    '& > div > *': {
        marginRight: 20,
        fontSize: 15,
        color: '#ffff',
        textDecoration: 'none'
    }
})

const Header = () => {
    // const logo = "https://get-staffed.com/wp-content/uploads/2020/07/indeed-logo.png";

    return (
        <StyledAppBar>
            <Toolbar>
                <Link to={routePath.home}>
                    {/* <img src={logo} alt="logo" style={{ width: 95, marginBottom: 6 }} /> */}
                    <h1> Nitte placement resources </h1>
                </Link>
                <Link to={routePath.create} style={{margin: "0 3rem 0 67rem"}}><span style={{fontSize:18}}>Post an experience</span></Link>
                <Link to={routePath.posts}><span style={{fontSize:18}}>Find interview experience</span></Link>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;