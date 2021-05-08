import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '@material-ui/core'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share"










const ShareDialog = ({ open, handleClose }) => {
    const iconSize = 40
    const sharedLink = 'https://github.com/sulaimon-olaniran/instagram-web-clone/blob/main/src/components/feed/each_feed/share/SharePost.js'
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <div className="experience-share-dialog-container">
                <div className="share-diaglog-button-container">
                    <EmailShareButton url={sharedLink}>
                        <EmailIcon round={true} size={iconSize}/>
                        <p>Share through mail</p>
                    </EmailShareButton>
                </div>

                <div className="share-diaglog-button-container">

                    <FacebookShareButton  url={sharedLink}>
                        <FacebookIcon round={true} size={iconSize}/>
                        <p>Share on Facebook</p>
                    </FacebookShareButton>

                </div>

                <div className="share-diaglog-button-container">

                    <LinkedinShareButton  url={sharedLink}>
                        <LinkedinIcon round={true} size={iconSize}/>
                        <p>Share on LinKedin</p>
                    </LinkedinShareButton>

                </div>

                <div className="share-diaglog-button-container">

                    <TelegramShareButton  url={sharedLink}>
                        <TelegramIcon round={true} size={iconSize}/>
                        <p>Share on Telegram</p>
                    </TelegramShareButton>

                </div>

                <div className="share-diaglog-button-container">

                    <TwitterShareButton  url={sharedLink}>
                        <TwitterIcon round={true} size={iconSize}/>
                        <p>Share on Twitter</p>
                    </TwitterShareButton>

                </div>

                <div className="share-diaglog-button-container">

                    <WhatsappShareButton  url={sharedLink}>
                        <WhatsappIcon round={true} size={iconSize}/>
                       <p>Share on Whatsapp</p> 
                    </WhatsappShareButton>

                </div>

                <div className="share-diaglog-button-container">
                    <Button onClick={handleClose}>Cancel</Button>
                </div>
            </div>

        </Dialog>
    )
}



export default ShareDialog