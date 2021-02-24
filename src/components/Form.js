import React, {Component} from 'react';
import * as Yup from 'yup';
import Message from './Message'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            blog: '',
            isValid: false,
        };

    }

    verify = async () => {        
        try {
            const {name, email, phone, blog} = this.state
            const data = {
                name,
                email,
                phone,
                blog
            }

            const schema = Yup.object().shape({
                name: Yup.string().min(3).max(30),
                email: Yup.string()
                  .required()
                  .email(),
                phone: Yup.string().min(11).max(11),
                blog: Yup.string().matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    'Enter correct url!'
                ).required(),
              });

            await schema.validate(data, {
                aborEarly: false,
            });

            if(phone[0] === '0' || phone[0] === '1'){
                console.log('q?')
                this.setState({isValid: false})
                return;
            }

            this.setState({isValid: true});

        } catch(err) {
            console.log("err", err)
            console.log('err', err.inner)
            this.setState({isValid: false});
        }
    }
    
    render() {
        const {name, email, phone, blog, isValid} = this.state
        return (
            <div className="form-container">
            <h1 className="text-center">Form Validation</h1>
            <form>
                <h3>Name:
                </h3>
                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => this.setState({name: e.target.value})} />
                <h3>Email:
                </h3>
                <input type="text" placeholder="Enter your e-mail" valye={email} onChange={(e) => this.setState({email: e.target.value})} />
                <h3>Phone:
                </h3>
                <input type="number" placeholder="Enter your phone" valye={phone} onChange={(e) => this.setState({phone: e.target.value})} />
                <h3>Blog URL:
                </h3>
                <input type="text" placeholder="Enter your blog URL" value={blog} onChange={(e) => this.setState({blog: e.target.value})} />
                <div className="small-6 small-centered text-center columns">
                    <a href="#" className="button success expand round text-center" onClick={this.verify}>Verify</a>
                </div>
            </form>
            <Message>{isValid ? 'Form is Completed!' : 'Form is Incompleted!'}</Message>
        </div>);
    }
}

export default Form;
