import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Container, Avatar, Article, Title, Button, WrapperScroll, Card, Map } from './styles';

export default class Game extends Component {
  state = {
    game: [],
    officialMaps: [],
    loading: true
  };
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      }),
    }).isRequired,
  };
  async componentDidMount(){
    const response = await Api.get(`/games/${this.props.match.params.id}`);
    this.setState({
      game: response.data.game,
      officialMaps: response.data.maps,
      loading: false
    });
  };
  render(){
    const { game, officialMaps, loading } = this.state;

    if(loading) return <Loading/>

    return (
      <Container>
        <Navbar/>
        <Avatar url={game.avatarUrl}/>
        <Article>
          <section>
            <Title>
              <MdKeyboardArrowRight/>
              <h2>Overview</h2>
            </Title>
            <p>{game.description}</p>
          </section>

          <section>
            <Title>
              <MdKeyboardArrowRight />
              <h2>Weapons & Equipment</h2>
            </Title>
            <WrapperScroll>
              <Button>Melee</Button>
              <Button>Pistols</Button>
              <Button>Shotguns</Button>
              <Button>Submachine</Button>
              <Button>Submachine</Button>
              <Button>Submachine</Button>
              <Button>Submachine</Button>
              <Button>Submachine</Button>
            </WrapperScroll>

            <WrapperScroll>
              <Card>
                <header>
                  <img src="https://ya-webdesign.com/images250_/awp-lightning-strike-png-6.png" alt="Arma" />
                </header>
                <p>
                  <strong>Alternate name(s):</strong>
                Combat knife, T Knife, CT Knife
                <strong>Rate of fire:</strong>
                .4 sec (Primary), 1 sec (Secondary)
                <strong>Used by:</strong>
                Terrorist, Counter-Terrorist, VIP
                <strong>Movement speed:</strong>
                (units per second) 250
                <strong>Kill Award:</strong>
                $1500 (Competitive), $750 (Casual)
              </p>
              </Card><Card>
                <header>
                  <img src="https://ya-webdesign.com/images250_/awp-lightning-strike-png-6.png" alt="Arma" />
                </header>
                <p>
                  <strong>Alternate name(s):</strong>
                Combat knife, T Knife, CT Knife
                <strong>Rate of fire:</strong>
                .4 sec (Primary), 1 sec (Secondary)
                <strong>Used by:</strong>
                Terrorist, Counter-Terrorist, VIP
                <strong>Movement speed:</strong>
                (units per second) 250
                <strong>Kill Award:</strong>
                $1500 (Competitive), $750 (Casual)
              </p>
              </Card>
            </WrapperScroll>
          </section>

          <section>
            <Title>
              <MdKeyboardArrowRight />
              <h2>Official Maps</h2>
            </Title>
            {
              officialMaps.map(item => {
                return (
                  <Map key={item._id}>
                    <h3>{item.description}</h3>
                    <img src={item.avatarUrl} alt={item.description} />
                  </Map>
                )
              })
            }
            <Link to="/">Go to home</Link>
          </section>
        </Article>
      </Container>
    )
  }
};
