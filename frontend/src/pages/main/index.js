import React, { Component } from 'react';
import { MainWrapper, Container, Card } from './styles';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import Api from '../../services/api';

class Main extends Component {
  state = {
    games: [],
    loading: true
  };
  async componentDidMount(){
    const response = await Api.get('/games');
    this.setState({
      games: response.data,
      loading: false,
    });
  }
  handleGoToGame = id => {
    this.props.history.push(`/game/${id}`);
  }
  render(){
    const { games, loading } = this.state;

    if(loading) return <Loading/>

    return (
      <MainWrapper>
        <Container>
          <Navbar/>
          <p>Acompanhe os updates e melhore seu progresso nos melhores games de battle royale</p>
          {
            games.map(game => (
              <Card
                key={game._id}
                onClick={() => this.handleGoToGame(game._id)}
                avatar={game.avatarUrl}/>
            ))
          }
        </Container>
      </MainWrapper>
    )
  }
};

export default Main;
