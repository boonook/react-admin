/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
class Wysiwyg extends Component {
    state = {
        editorContent: '',
        editorState: '',
    };

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        },()=>{
            this.props.getContent(draftToHtml(this.state.editorContent))
        });
    };


    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData(); // eslint-disable-line no-undef
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );


    render() {
        const { editorState } = this.state;
        return (
            <div className="gutter-example button-demo">
                <Editor
                    editorState={editorState}
                    toolbarClassName="home-toolbar"
                    wrapperClassName="home-wrapper"
                    editorClassName="home-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        history: { inDropdown: true },
                        inline: { inDropdown: false },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        image: { uploadCallback: this.imageUploadCallBack },
                    }}
                    onContentStateChange={this.onEditorChange}
                    placeholder="请输入正文~~尝试@哦，有惊喜"
                    spellCheck
                    onFocus={() => {console.log('focus')}}
                    onBlur={() => {console.log('blur')}}
                    onTab={() => {console.log('tab'); return true;}}
                    localization={{ locale: 'zh', translations: {'generic.add': 'Test-Add'} }}
                    mention={{
                        separator: ' ',
                        trigger: '@',
                        caseSensitive: true,
                        suggestions: [
                            { text: 'A', value: 'AB', url: 'href-a' },
                            { text: 'AB', value: 'ABC', url: 'href-ab' },
                            { text: 'ABC', value: 'ABCD', url: 'href-abc' },
                            { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
                            { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
                            { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
                            { text: 'ABCDEFG', value: 'ABCDEFG', url: 'href-abcdefg' },
                        ],
                    }}
                />

                <style>{`
                    .home-editor {
                        min-height: 300px;
                    }
                `}</style>
                {/*<Card title="同步转换HTML" bordered={false}>*/}
                {/*    <pre>{draftToHtml(editorContent)}</pre>*/}
                {/*</Card>*/}
            </div>
        );
    }
}

export default Wysiwyg;
