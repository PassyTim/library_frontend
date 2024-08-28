import React, {useRef} from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button
} from "@chakra-ui/react";

const DeleteAlert = ({ isOpen, onOpen, onClose, itemType, itemName, deleteFunc}) => {
    const cancelRef = useRef();
    const deleteItem = () => {
        deleteFunc();
        onClose();
    }

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>Удаление</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Вы уверены, что хотите удалить {itemType} {itemName}?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Нет
                    </Button>
                    <Button onClick={deleteItem} colorScheme='red' ml={3}>
                        Да
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAlert;