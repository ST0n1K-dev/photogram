import React from 'react';
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

import {
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon,
    ChatBubbleOutline as ChatBubbleOutlineIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

import { PostActionsInterface, DeleteConfirmationDialogInterface } from './Post.config';

const DeleteConfirmationDialog = (props: DeleteConfirmationDialogInterface) => {
    const { isOpened, handleClose, handleDeletePost } = props;

    return (
        <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          Точно бажаєте видалити публікацію?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Після видалення публікації у вас не буде можливості його відновлення.
            Видаляйте на свій страх та ризик.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Назад</Button>
          <Button onClick={handleDeletePost} autoFocus>
            Видалити
          </Button>
        </DialogActions>
        </Dialog>
    );
};

const PostActions = ({
    likes, isLiked, handleLike, handleCommentFocus, editAvailable, deleteAvailable,
    handleEditPostClick, handleDeletePost
}: PostActionsInterface) => {
    const [isOpened, setIsOpened] = React.useState<boolean>(false);

    const handleOpen = () => {
        setIsOpened(true);
    };

    const handleClose = () => {
        setIsOpened(false);
    };

    return (
        <div className="Post__Actions">
            <div className="Post__Actions--buttons">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleLike}
                >
                    { isLiked ? <FavoriteIcon className="Post__Actions--liked" /> : <FavoriteBorderIcon /> }
                </IconButton>
                <IconButton aria-label="comment" onClick={handleCommentFocus}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
                {editAvailable && (
                    <IconButton aria-label="edit" onClick={handleEditPostClick}>
                        <EditIcon />
                    </IconButton>
                )}
                {deleteAvailable && (
                    <>
                        <IconButton aria-label="delete" onClick={handleOpen}>
                            <DeleteIcon />
                        </IconButton>
                        <DeleteConfirmationDialog
                            isOpened={isOpened}
                            handleClose={handleClose}
                            handleDeletePost={handleDeletePost}
                        />
                    </>
                )}
            </div>
            <span className="Post__Actions--likes">{likes} вподобань</span>
        </div>
      );
};

export default PostActions;
