import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import styled from 'styled-components';
import Card from "./components/Card";

export default class App extends React.Component {
    // Try to think through what state you'll need for this app before starting. Then build out
    // the state properties here.

    constructor() {
        super();

        this.state = {
            characters: [],
            page: 1,
            searchTerm: ""
        };
    }

    componentDidMount() {
        this.callData(1);
    }

    callData = i => {
      axios
            .get(`https://swapi.co/api/people/?page=${i}`)
            .then(({ data }) => {
                this.setState(prevState => ({
                    characters: [...prevState.characters, [...data.results]]
                }));
            })
            .catch(err => console.error(err.message))
            .finally(() => {
                if(i === 8) return;
                else this.callData(i + 1);
            });
    }

    changePage = i => {
      const { page, characters } = this.state;
      if(i === 1 && page === characters.length) return;
      else if(i === -1 && page === 1) return;
      else this.setState(prevState => ({
        page: prevState.page + i
      }))
    }

    render() {
        const { characters, page, searchTerm } = this.state;
        console.log(characters);
        return (
            <StyledApp className="App">
                <h1 className="blue Header">React Wars</h1>
                <ControllerSection className='controls'>
                  <StyledPageIndicator className='blue'>{page}</StyledPageIndicator>
                  <StyledInput type='text' name='search' value={searchTerm} onChange={(e) => this.setState({searchTerm: e.target.value})} />
                  <StyledButton onClick={() => this.changePage(-1)}>Previous Page</StyledButton>
                  <StyledButton onClick={() => this.changePage(1)}>Next Page</StyledButton>
                </ControllerSection>
                <CharacterWrapper className="characters">
                    {
                      characters[page-1] ?
                      characters[page-1].map((character, index) => {
                          return character.name.toLowerCase().includes(searchTerm.toLowerCase()) ? <Card key={index} character={character} /> : null
                        }
                      )
                      : (<h1>Loading...</h1>)
                    }
                </CharacterWrapper>
            </StyledApp>
        );
    }
}

const StyledApp = styled.div`h1.blue {color:#3795FF;}`;


const CharacterWrapper = styled.section`
  width: 80%;
  margin: 0 auto;

  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ControllerSection = styled.section`
  width: 80%;
  margin: 0 auto;
  display:flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  height: 50px;
  width: 150px;

  & + & { margin-left: 15px; }

  background: #3795FF;
  color: white;
  border: 0;
  border-radius: 5px;
  border-right: 3px solid #4C93EF;
  border-bottom: 3px solid #4C93EF;

  font-weight: bold;

  &:focus, &:active {
    outline:none;
  }
`;

const StyledInput = styled.input`
  height: 50px;
  width: 60%;
  background: #3795FF;

  margin: 0 auto;
  
  border: 0;
  border-radius: 5px;
  border-right: 3px solid #4C93EF;
  border-bottom: 3px solid #4C93EF;

  &:focus, &:active {
    outline:none;
  }

  text-indent: 20px;
  color: white;
`;

const StyledPageIndicator = styled.span`
  padding: 20px;
  background: #3795FF;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border-right: 3px solid #4C93EF;
  border-bottom: 3px solid #4C93EF;
`;