import React, {Component} from 'react';
import './App.css';
import TOC from './components/TOC';
import CreateContent from './components/CreateContent';
import ReadContent from './components/ReadContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';


class App extends Component{
    constructor(props) {
        super(props);
        this.max_content_id = 3;
        this.state = {
            mode:'read',
            selected_content_id: 2,
            welcome: {title: 'Welcome', desc:'Hello, React!!'},
            subject:{
                title:'WEB',
                sub:'World Wide Web'
            },
            contents:[
                {id:1, title: 'HTML',       desc:'HTML is for information'          },
                {id:2, title: 'CSS',        desc:'CSS is for design'                },
                {id:3, title: 'JavaScript', desc:'JavaScript is for interactive'    }
            ]
        }
    }

    getReadContent(){
        let i = 0;
        while(i < this.state.contents.length){
            let data = this.state.contents[i];
            if(data.id === this.state.selected_content_id){
                return data;
            }
            i++;
        }
    }
    getContent(){
        let _title, _desc, _article = null;
        if(this.state.mode === 'welcome'){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}/>;
        } else if(this.state.mode === 'read'){
            let _content = this.getReadContent();
            console.log('_content', _content);
            _article = <ReadContent title={_content.title} desc={_content.desc}/>;
        } else if(this.state.mode === 'create'){
            _article =
                <CreateContent onSubmit={function(_title, _desc){
                    this.max_content_id++;
                    let _contents = this.state.contents.concat(
                        {id: this.max_content_id, title: _title, desc: _desc});
                    this.setState({mode: 'read', selected_content_id: this.max_content_id, contents:_contents});
                }.bind(this)
                }/>;
        } else if(this.state.mode === 'update'){
            let _content = this.getReadContent();
            _article =
                <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
                    let _contents = Array.from(this.state.contents);
                    let i = 0;
                    while(i < _contents.length){
                        if(_contents[i].id === _id){
                            _contents[i].id = _id;
                            _contents[i].title = _title;
                            _contents[i].desc = _desc;
                            break;
                        }
                        i++;
                    }
                    this.setState({mode: 'read', contents:_contents});
                }.bind(this)
                }/>;
        }

        return _article;
    }

    render(){
        console.log('App render');


        return (
            <div className="App">
                <Subject title={this.state.subject.title} sub={this.state.subject.sub}
                         onChangePage={function(){this.setState({mode:'welcome'})}.bind(this)}
                />
                <TOC data={this.state.contents} onChangePage={function(id){
                    this.setState({mode:'read', selected_content_id:Number(id)})
                }.bind(this)}/>
                <Control onChangeMode={function (_mode){
                    if(_mode === 'delete'){
                        if(window.confirm('really?')){
                            let _content = Array.from(this.state.contents);
                            let i = 0;
                            while(i < _content.length){
                                if(_content[i].id === this.state.selected_content_id){
                                    _content.splice(i,1);
                                }
                                i++;
                            }
                            this.setState({
                                mode:'welcome',
                                contents: _content
                            })
                            alert('deleted!');
                        }
                    } else{
                        this.setState({mode:_mode});
                    }
                }.bind(this)}/>
                {this.getContent()}
            </div>
        )
    }
}

export default App;
