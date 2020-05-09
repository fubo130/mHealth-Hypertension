import React, { Component } from 'react';

export class PlayGamesScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            onShow: [],
            score: 0,
            numLeft: 12,
            
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(cardID) {
        if (this.state.selected.length == 0) {
            // flipCard(cardID);
            this.setState({
                selected: this.state.selected.concat([cardID])
            });
        } else {
            if (this.state.selected.includes(cardID)) {
                this.setState({
                    score: this.state.score+2,
                    numLeft: this.state.numLeft-2,
                    onShow: this.state.onShow.filter(function(val) {return val !==cardID})

                })
            }
        }
    }
}