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
    categories: [],
    officialMaps: [],
    activeCateg: 0,
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
      categories: response.data.categories,
      officialMaps: response.data.maps,
      activeCateg: 0,
      loading: false
    });
  };

  setCategoryActive = (index) => {
    this.setState({
      activeCateg: index
    });
  };

  render(){
    const { game, categories, activeCateg, officialMaps, loading } = this.state;

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
              <h2>Weapons</h2>
            </Title>
            <WrapperScroll>
              {
                categories.map((category, index) => {
                  return <Button
                            onClick={() => this.setCategoryActive(index)}
                            active={index === activeCateg}
                            key={category._id}>{category._id}</Button>
                })
              }
            </WrapperScroll>

            <WrapperScroll>
              {
                categories[activeCateg].weapons.map(weapon => {
                  const attributes = JSON.parse(weapon.attributes);
                  return (
                    <Card key={weapon.id}>
                      <header>
                        <img src={weapon.avatarUrl} alt={weapon.title} />
                      </header>
                      <p>
                        {
                        Object.entries(attributes).map((attribute, index) => {
                          return (
                            <span key={`${attribute}-${index}`}>
                              <strong>{attribute[0]}:</strong> {attribute[1]}
                            </span>
                          )
                        })
                        }
                        </p>
                    </Card>
                  )
                })
              }
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
