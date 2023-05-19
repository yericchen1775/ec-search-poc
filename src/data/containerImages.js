import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";


 const DisplayImagesFromContainer = ({ blobList }) => (
 
  <div>
    <h2>Container items</h2>

    <ul>
      {/*blobList.map((item) => {
          return (
           
              <div>
                {item.name}
                <br />
                {item.url}
                <img src={item.url} height="200" />
              </div>
          
          );
        })*/}
    </ul>

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Name</b></TableCell>
            <TableCell align="center"><b>Content</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blobList.map((item) => (
            <TableRow>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.urlContent}</TableCell>

              <TableCell align="center">
                <img src={item.url} height="100" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default DisplayImagesFromContainer;
