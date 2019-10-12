import React from 'react';
import { connectAlita } from 'redux-alita';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./base64Upload.less";
import { Modal,Icon,message } from 'antd';

class Base64UploadModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            title:'裁剪图片',
            status:'add',
            src: null,
            scale:1,
            base64:null,
            crop: {
                unit: "%",
                width: 30,
                aspect:this.props.scale
            }
        }
    }
    componentDidMount(){
        this.props.onRef(this);
        this.setState({
            visible:this.props.status
        })
    }

    myName=(status,data)=>{
        this.setState({
            visible:true,
            userName:'',
            userPwd:'',
            userPwdAgain:'',
            userEmail:'',
            code:'',
        });
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }


    getBase64Image=(image,ext)=>{
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image,0,0,image.width,image.height);

// 这里是不支持跨域的
        let base64 = canvas.toDataURL("image/"+ext);
        return base64;

    }

    ///点击确定
    handleOk=(e)=>{
        if(this.state.croppedImageUrl+''===''||this.state.croppedImageUrl===null||this.state.croppedImageUrl===undefined){
            message.error('未能获取到图片！');
        }else{
            let that = this;
            let image = new Image();
            image.src = this.state.croppedImageUrl;
            image.onload = function(){
                let ext = that.state.croppedImageUrl.substring(that.state.croppedImageUrl.lastIndexOf(".")+1);
                let base64 = that.getBase64Image(image,ext);
                that.setState({
                    visible:false,
                    base64
                },()=>{
                    that.props.onSave(that.state.croppedImageUrl,that.state.base64);
                });
            };
        }
    };

    ///取消
    handleCancel=()=>{
        this.setState({
            visible:false,
            src: null,
            croppedImageUrl:null
        })
    };

    render() {
        const { crop, croppedImageUrl, src } = this.state;
        return (
            <div>
                {this.state.visible?<Modal
                    width={'60%'}
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <div className="App">
                            <div className={'corpy_box'}>
                                <div className={'corpy_box_before'}>
                                    {!src? <div>
                                        <input className={'uploadInput'} style={{width:'100%',height:'300px',opacity:0}} type="file" onChange={this.onSelectFile} />
                                        <Icon className={'uploadIcon'}  style={{ fontSize: '80px', color: '#ccc' }}  type="plus-circle" />
                                    </div>:null}
                                    {src && (
                                        <ReactCrop
                                            src={src}
                                            crop={crop}
                                            onImageLoaded={this.onImageLoaded}
                                            onComplete={this.onCropComplete}
                                            onChange={this.onCropChange}
                                        />
                                    )}
                                </div>
                                <div className={'corpy_box_after'}>
                                    <div className={'corpy_box_after_div'}>
                                        {croppedImageUrl && (
                                            <img alt="Crop" style={{ width:"100%" }} src={croppedImageUrl} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/*<div>*/}
                            {/*    <img alt="Crop" style={{ width:"100%" }} src={this.state.base64} />*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Modal>:null}
            </div>
        )
    }
}

export default connectAlita(['Base64UploadModel'])(Base64UploadModel);
