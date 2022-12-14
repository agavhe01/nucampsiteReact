import React, { Component } from 'react';
//import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
//import Contact from './ContactComponent';
import CampsiteInfo from './CampsiteInfoComponent'
import About from './AboutComponent'
import { Switch, Route, Redirect } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS,
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId});
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.state.partners.filter(partner => partner.featured)[0]}
                 />
            );
        };

        const AboutPage = () => {
            return (
                <About
                    partners = {this.state.partners}
                />
            )

        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo
                    campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Route path='/aboutus' component={AboutPage} />
                    <Route exact path='/directory'/>
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default Main;
