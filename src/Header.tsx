import React, {FC, ReactElement} from 'react';
import './Header.css';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import logo from "./logo.png";
import ForumIcon from '@material-ui/icons/Forum';



interface Props {

    title?: String
}

const Header: FC<Props> = ({title}): ReactElement => {
    return (

        <div className={'header'}>
            <IconButton>
                <PersonIcon fontSize={"large"} className={"header__icon"}/>
            </IconButton>
            <img src={logo} className={'header__logo'} alt={'logo'}/>
            <IconButton>
                <ForumIcon fontSize={'large'} className={'header__icon'}/>
            </IconButton>
        </div>


    )


}

export default Header;