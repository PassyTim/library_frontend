import React from 'react';
import {Badge, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const BookCard = (props) => {
    const router = useNavigate()
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            width={{ base: '100%', sm: '750px' }}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={props.imageUrl}
                alt={props.name}
            />

            <Stack spacing={4} width="100%">
                <CardBody>
                    <Heading size='md'>{props.name}</Heading>
                    <Heading size='xs' py='2'>{props.genre}</Heading>

                    <Text pt={2} noOfLines={4}>
                        {props.description}
                    </Text>
                </CardBody>

                <CardFooter>
                    <Button onClick={()=> router(`/books/${props.id}`)} variant='solid' colorScheme='teal'>
                        Подробнее
                    </Button>
                    {props.userId !== null
                        ? <Badge  ml={3} p={2} size='ml' variant='outline' colorScheme='gray' fontSize='0.8em' >Нет в наличии</Badge>
                        : <></>
                    }
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default BookCard;