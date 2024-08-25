import React from 'react';
import {Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text} from "@chakra-ui/react";

const BookCard = (props) => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            width={{ base: '100%', sm: '750px' }}  // Установите фиксированную ширину
            height="300px"  // Установите фиксированную высоту
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
                    <Button variant='solid' colorScheme='teal'>
                        Подробнее
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default BookCard;