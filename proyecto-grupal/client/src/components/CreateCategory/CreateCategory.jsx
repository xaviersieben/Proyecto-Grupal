import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postCategory } from '../../redux/actions/productsActions';
import { getCategories } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateCategory () {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const history = useHistory();

    const [input, setInput] = useState({
        name: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    console.log(categories);

    function handleInputChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function validate(inputToValidate) {
        let errors = {};
        if (inputToValidate.name === '') {
            errors.name ?
            errors.name = errors.name + " Category name must not be empty," :
            errors.name = " Category name must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.name)) {
            errors.name ?
            errors.name = errors.name + " Category name must not contain only numbers," :
            errors.name = " Category name must not contain only numbers,";
        }
        
        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            alert('Please, verify the provided information');
        } else if (!input.name) {
            alert('Please, complete the name input before submitting');
        } else {
            console.log(`Categoría a agregar: ${input.name}`);
            let category = {};
            category.name = input.name;
            dispatch(postCategory(category));
            dispatch(getCategories());
            alert('Category created!');
            setInput({
                name:''
            });

            //history.push('/Home');
        }
    }

    return (
        <div>
            <h1>Creación de nueva categoría:</h1>
            <form>
                <label htmlFor="">Nombre:</label>
                <input placeholder="Nombre de la categoría..." value={input.name} name="name" type="text" onChange={(e) => handleInputChange(e)} />
                {errors.name && <span>*{errors.name}</span>}
                <button onClick={(e) => { handleSubmit(e) }}>Crear Categoría</button>
            </form>
            <h3>Categorías existentes:</h3>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                    {categories?.map((category, index) => {
                        return (
                            <tr key={index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}