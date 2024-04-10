import React, { useState } from 'react';
import "../assets/style/Calculator.css";

function Calculator() {
    const [input, setInput] = useState("");
    const [lexResult, setLexResult] = useState([]);
    const [operations, setOperations] = useState([]);
    const [operationTree, setOperationTree] = useState("");
    const [operationElements, setOperationElements] = useState([]); // Nuevo estado

    const handleClick = (e) => {
        setInput(input + e.target.name);
        setLexResult([...lexResult, e.target.name]);
        setOperationElements([...operationElements, e.target.name]); // Agregar el elemento a operationElements
    }

    const calculate = () => {
        try {
            const result = eval(input).toString();
            setInput(result);
            setOperations([...operations, `${input} = ${result}`]);
            setOperationTree(createOperationTree(input));
        } catch (error) {
            setInput("Error");
        }
    }

    const clear = () => {
        setInput("");
        setLexResult([]);
        setOperationTree("");
        setOperationElements([]); // Limpiar operationElements
    }

    const createOperationTree = (input) => {
        const elements = input.split(/(\+|\-|\/|\*)/);
        let tree = '';
        elements.forEach((element, index) => {
            const symbol = index % 2 === 0 ? '/' : '\\';
            if (element !== "") {
                tree += symbol + ' '.repeat(index) + element + '\n';
            }
        });
        return tree;
    }

    function getTokenType(token) {
        if (!isNaN(token)) {
            return 'numérico';
        }
        switch (token) {
            case '+':
                return 'operador suma';
            case '-':
                return 'operador resta';
            case '/':
                return 'operador división';
            case '*':
                return 'operador multiplicación';
            case '(':
                return 'paréntesis izquierdo';
            case ')':   
                return 'paréntesis derecho';
            case '.':   
                return 'punto decimal';
            default:
                return 'desconocido';
        }
    }

    return ( 
        <>
            <div className="container">
                <div id="cal-body">
                    <div className="input">
                        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                    </div>
                    <div>
                        <p>Analisis Lexico: {lexResult.join(' ')}</p>
                    </div>
                    <div style={{paddingTop: '3rem'}}>
                        <div className="buttons">
                            <button name="1" onClick={handleClick}>1</button>
                            <button name="2" onClick={handleClick}>2</button>
                            <button name="3" onClick={handleClick}>3</button>
                            <button name="+" onClick={handleClick}>+</button>
                        </div>
                        <div className="buttons">
                            <button name="4" onClick={handleClick}>4</button>
                            <button name="5" onClick={handleClick}>5</button>
                            <button name="6" onClick={handleClick}>6</button>
                            <button name="-" onClick={handleClick}>-</button>
                        </div>
                        <div className="buttons">
                            <button name="7" onClick={handleClick}>7</button>
                            <button name="8" onClick={handleClick}>8</button>
                            <button name="9" onClick={handleClick}>9</button>
                            <button name="*" onClick={handleClick}>*</button>
                        </div>
                        <div className="buttons">
                            <button name="." onClick={handleClick}>.</button>
                            <button name="0" onClick={handleClick}>0</button>
                            <button name="(" onClick={handleClick}>(</button>
                            <button name=")" onClick={handleClick}>)</button>
                        </div>
                        <div className="buttons">
                            <button onClick={clear}>CL</button>
                            <button name="/" onClick={handleClick}>/</button> 
                            <button style={{ width: "18rem"}} onClick={calculate}>=</button>
                        </div>
                    </div>
                </div>
                <div id="operations">
                    <h1 className='tituloOperaciones'>Operaciones</h1>
                    {operations.map((operation, index) => (
                        <p className="estiloImpresion" key={index}>{index + 1}.- {operation}</p>
                    ))}
                    <div style={{ boxShadow: '5px 5px 15px rgba(0,0,0,0.3)', borderRadius: '10px', border: '3px solid black', marginTop: "1rem"}}>
                        <h4 className='tituloOperaciones'> Arbol</h4>
                        <pre className="estiloImpresion">{operationTree}</pre>
                    </div>
                </div>
                <div style={{ marginLeft: '5rem' }}>
                    <h3 className='tituloOperaciones'>Impresión de Token</h3>
                    {operationElements.map((element, index) => {
                        const tokenType = getTokenType(element);
                        return (
                            <p className="estiloImpresion" key={index}>Line {index + 1}: Generado por el Token "{element}" de tipo {tokenType}</p>
                        );
                    })}
                </div>
            </div>
        </>
     );
}

export default Calculator;




//import { ParserRules, ParserStart } from '../gramatica/grammar.js';
//const compiledGrammar = { ParserRules, ParserStart };