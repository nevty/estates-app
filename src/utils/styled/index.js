import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";

export const FilterButton = styled((props) =><Button
    color="default"
    variant="text"
    disableTouchRipple
    size="small"
    {...props}
/>)`
  min-width: 38px;
  margin-left: 5px;
  font-size: 1.01rem;
  font-weight: 400;
  text-transform: none;
  &:first-child {
      margin-left: 0
  }
  &:hover {
    background-color: white;
    color: ${indigo.A700};
  }
  &.active {
    background-color: ${indigo.A200};
    color: white;
  }
`