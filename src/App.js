import React, {Component} from 'react';

class Nav extends Component{
    render(){
        let listTag = [];
        for(let i = 0; i < this.props.list.length; i++){
            let li = this.props.list[i];
            listTag.push(
                <li key={li.id}><a href={li.id} data-id={li.id} onClick={function(e){
                    e.preventDefault();
                    console.log('trigger');
                    this.props.onClick(e.target.dataset.id);
                }.bind(this)}>{li.title}</a></li>
            )
        }
        return (
            <nav>
                <ul>
                    {listTag}
                </ul>
            </nav>
        )
    }
}

class Article extends Component{
    render(){
        return (
            <article>
                <h2>{this.props.title}</h2>
                {this.props.desc}
            </article>
        )
    }
}

class NowLoading extends Component{
    render(){
        return (
            <div>Now Loading...</div>
        )
    }
}

class App extends Component{
    state = {
        list:{
            items:[],
            isLoading: false
        },
        article: {item:{title: 'Welcome', desc: 'Hello, React & Ajax'}, isLoading: false}
    }

    componentDidMount() {
        let newList = Object.assign({},this.state.list, {isLoading:true});
        this.setState({list: newList});
        fetch('list.json')
            .then(function(res){
                return res.json();
            })
            .then(function (json){
                console.log(json);
                this.setState({list:{items:json, isLoading: false}});
            }.bind(this));
    }

    render() {
        console.log('call render', this.state.article.isLoading);
        let NavTag = null;
        if(this.state.list.isLoading){
            NavTag = <NowLoading/>;
        } else{
            NavTag = <Nav list={this.state.list.items} onClick={function(id){
                let newArticle = Object.assign({}, this.state.article, {isLoading: true});
                this.setState({article: newArticle});

                fetch(id+'.json')
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(json){
                        this.setState({article: {item:{title: json.title, desc: json.desc}, isLoading: false}})
                    }.bind(this));
            }.bind(this)}/>
        }

        let ArticleTag = null;
        if(this.state.article.isLoading){
            ArticleTag = <NowLoading/>
        } else{
            ArticleTag = <Article title={this.state.article.item.title} desc={this.state.article.item.desc}/>
        }

        return(
            <div className="App">
                <h1>WEB</h1>
                {NavTag}
                {ArticleTag}
            </div>
        )

    }
}

export default App;
