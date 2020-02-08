import * as React from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useSubscription } from "@apollo/react-hooks";
import { GET_CHAPTER_BY_ID } from "queries/chapters";

interface ICharacterListProps {
  ids: any[];
  onChange: any;
}

export default function CharacterList({ ids, onChange }: ICharacterListProps) {
    const {} = useSubscription(GET_CHAPTER_BY_ID)
    return (
        <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"age"}
          onChange={onChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    )
}