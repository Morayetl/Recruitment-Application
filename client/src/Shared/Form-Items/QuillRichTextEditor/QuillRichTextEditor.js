import React from 'react';
import Quill from 'quill';

const toolbarOptions = [['bold', 'italic', 'underline', 'strike'], [{ 'list': 'ordered'}, { 'list': 'bullet' }],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],['link']];
let timer = null;

class QuillRichTextEditor extends React.Component {
  state = {value:''};
  componentDidMount(){
    this.quill = new Quill('#quill-editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });

    this.quill.on('text-change', (function(delta, oldDelta, source) {
      if(timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => { // return the timeoutID
        this.props.onChange(this.quill.root.innerHTML);
        timer = null;
      }, 300);
    }).bind(this));
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.value !== this.quill.root.innerHTML){
        if(this.props.value){
          this.quill.root.innerHTML = this.props.value;        
        }

          if(this.props.value && this.props.value.length > 0){
            setTimeout(() => {
              this.quill.setSelection(0);
              });            
          }
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps ) {
      return {
        value: nextProps.value || ''
      };
    }
    return null;
  }

  render() {
    return (
      <div style={{height: '250px'}} id="quill-editor"></div>
    );
  }
}

export default QuillRichTextEditor;
