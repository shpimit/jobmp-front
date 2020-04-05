import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete'

export default function Customer(props) {

    return (
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell><img src={props.image} alt="profile"/></TableCell>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.email}</TableCell>
            <TableCell>{props.gender}</TableCell>
            <TableCell>{props.grade}</TableCell>
            <TableCell>{props.like}</TableCell>
            <TableCell>{props.birthday}</TableCell>
            <TableCell>{props.skill}</TableCell>
            <TableCell>{props.eduyn}</TableCell>
            <TableCell>{props.project}</TableCell>
            <TableCell>{props.period}</TableCell>
            <TableCell><CustomerDelete stateRefresh={props.stateRefresh} id={props.id}/></TableCell>    
        </TableRow>
    );
};
