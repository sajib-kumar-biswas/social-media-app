import './share.css'
import {PermMedia, Label, Room, EmojiEmotions} from '@material-ui/icons'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const Share = () => {
    const {user} = useContext(AuthContext);
    const desc = useRef();
    const [imgName,setImgName] = useState(null);

    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(imgName);
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            img: imgName    
        }

        try{
            await axios.post('/posts/create',newPost);
            navigate(`/profile/${user.username}`)
        }catch(err){

        }
    }

    useEffect(()=>{

    },[imgName])

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture || "/assets/person/default.png"} alt="" className="shareProfileImage" />
                    <input ref={desc} placeholder={`What's on your mind ${user.username}?`} className="shareInput" />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor='targetInput' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className="shareOptionText">
                                Photo/Video
                            </span>
                            <input style={{display: "none"}} type="file" id="targetInput" accept='.jpg, .png, .jpeg' onChange={(e)=>{setImgName(e.target.files[0].name)}} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className="shareOptionText">
                                Tag
                            </span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className="shareOptionText">
                                Location
                            </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">
                                Feelings
                            </span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share;