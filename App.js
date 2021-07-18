import React from "react"
import Formula from "./Formula"
import Output from "./Output"
import Buttons from "./Buttons"
const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/
 
class App extends React.Component
{
    constructor(){
        super()
        this.state={
            currentVal:'0',
            prevVal:'0',
            formula:'',
            eval1:false
        }
        this.handlenum=this.handlenum.bind(this);
        this.handleop=this.handlenum.bind(this);
        this.handleeval=this.handleeval.bind(this);
        this.initialize=this.initialize.bind(this);
    }
    initialize(){
        this.setState({
            currentVal:'0',
            prevVal:'0',
            formula:'',
            eval1:false
        });
    }
    handlenum(e){
        const value = e.target.value;
        const { formula, prevVal, eval1,currentVal } = this.state;
        if(this.state.eval1)
        {
            this.setState({
            currentVal:value,
            formula:value,
             prevVal:'0',
             eval1:false
            });
        }
        else if(this.state.prevVal == '0')
        {
            this.setState({
            currentVal:value,
            formula:formula+value,
             prevVal:currentVal,
             eval1:false
            });
        }
        else if(this.state.prevVal!='0')
        {
            this.setState({
            currentVal:value,
            formula:formula + value,
             prevVal:currentVal,
             eval1:false
            });
        }
            
        }
    handleop(e){
        const value = e.target.value;
        const { formula, prevVal, eval1,currentVal } = this.state;
        if(endsWithOperator.test(formula))
        {
            this.setState({
                formula:formula+value
            })
        }
        else if(this.state.prevVal!='0')
        {
            this.setState({
                formula:formula+value,
                prevVal:currentVal,
                currentVal:value
            })
        }
        else if(this.state.eval1 == true)
        {
            this.setState({
                formula:formula+value,
                prevVal:currentVal,
                currentVal:value,
                eval1:false
            })
        }
        
        
        
    }
    handleeval(){
        let expression = this.state.formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, '*')
        .replace(/‑/g, '-')
        .replace('--', '+0+0+0+0+0+0+');
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentVal: answer.toString(),
        formula:
          expression
            .replace(/\*/g, '⋅')
            .replace(/-/g, '‑')
            .replace('+0+0+0+0+0+0+', '‑-')
            .replace(/(x|\/|\+)‑/, '$1-')
            .replace(/^‑/, '-') +
          '=' +
          answer,
        prevVal: answer,
        eval1: true
      });
    }
        
        
        
    
            
            
            
        
    
    
    render(){
        
        
        return(
            <div>
        <div className="calculator">
          <Formula formula={this.state.formula.replace(/x/g, '⋅')} />
          <Output currentValue={this.state.currentVal} />
          <Buttons
            evaluate={this.handleeval}
            initialize={this.initialize}
            numbers={this.handlenum}
            operators={this.handleop}
          />
        </div>
        <div className="author">
          
        </div>
      </div>
            
            
            
        )
    }
}


export default App
