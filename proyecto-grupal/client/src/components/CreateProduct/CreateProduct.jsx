import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postProduct } from '../../redux/actions/productsActions';
import { getCategories } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateProduct() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const history = useHistory();



    const [input, setInput] = useState({
        title: '',
        description: '',
        price: 0,
        rating: 0,
        stock: 0,
        brand: '',
        categories: [],
        thumbnail: '',
        images: '',
        active: true
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

    function handleCheckBoxChange(e) {
        
        if(e.target.checked) {
            if(!input.categories.includes(e.target.value)) {
                setInput({
                    ...input,
                    categories: [...input.categories, e.target.value]
                });
                setErrors(validate({
                    ...input,
                    categories: [...input.categories, e.target.value]
                }));
            }
        } else if (!e.target.checked) {
            setInput({
                ...input,
                categories: input.categories.filter(category => {
                    return category !== e.target.value
                })
            });
            setErrors(validate({
                ...input,
                categories: input.categories.filter(category => {
                    return category !== e.target.value
                })
            }));
        }
    }


    function validate(inputToValidate) {
        let errors = {};
        if (inputToValidate.title === '') {
            errors.title ?
            errors.title = errors.title + " Product name must not be empty," :
            errors.title = " Product name must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.title)) {
            errors.title ?
            errors.title = errors.title + " Product name must not contain only numbers," :
            errors.title = " Product name must not contain only numbers,";
        }
        if (inputToValidate.description === '') {
            errors.description ? 
            errors.description = errors.description + " Description must not be empty," :
            errors.description = " Description must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.description)) {
            errors.description ?
            errors.description = errors.description + " Description must not contain only numbers," :
            errors.description = " Description must not contain only numbers,";
        }
        if (!/^\d+$/.test(inputToValidate.price)) {
            errors.price ? 
            errors.price = errors.price + " Price must contain only numbers," : 
            errors.price = " Price Score must contain only numbers,";
        }
        if (inputToValidate.price < 0) {
            errors.price ?
            errors.price = errors.price + " Price must be a number equal to or above 0," :
            errors.price = " Price must be a number equal to or above 0,";
        }
        if (!/^\d+$/.test(inputToValidate.rating)) {
            errors.rating ? 
            errors.rating = errors.rating + " Rating must contain only numbers," : 
            errors.rating = " Rating Score must contain only numbers,";
        }
        if (inputToValidate.rating < 0 || inputToValidate.rating > 5) {
            errors.rating ?
            errors.rating = errors.rating + " Rating must be a number equal to or above 0 or equal to or below 5," :
            errors.rating = " Rating must be a number equal to or above 0 or equal to or below 5,";
        }
        if (!/^\d+$/.test(inputToValidate.stock)) {
            errors.stock ? 
            errors.stock = errors.stock + " Stock must contain only numbers," : 
            errors.stock = " Stock Score must contain only numbers,";
        }
        if (inputToValidate.stock < 0) {
            errors.stock ?
            errors.stock = errors.stock + " Stock must be a number equal to or above 0," :
            errors.stock = " Stock must be a number equal to or above 0,";
        }
        if (inputToValidate.brand === '') {
            errors.brand ?
            errors.brand = errors.brand + " Brand must not be empty," : 
            errors.brand = " Brand must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.brand)) {
            errors.brand ?
            errors.brand = errors.brand + " Brand must not contain only numbers," : 
            errors.brand = " Brand must not contain only numbers,";
        }
        if (inputToValidate.categories.length === 0) {
            errors.categories ? 
            errors.categories = errors.categories + " You must select at least one category," :
            errors.categories = " You must select at least one category,";
        }
        if (inputToValidate.thumbnail === '') {
            errors.thumbnail ?
            errors.thumbnail = errors.thumbnail + " Thumbnail must not be empty," : 
            errors.thumbnail = " Thumbnail must not be empty,";
        }
        if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(inputToValidate.thumbnail)) {
            errors.thumbnail ?
            errors.thumbnail = errors.thumbnail + " Thumbnail must be a valid link," :
            errors.thumbnail = " Thumbnail must be a valid link,";
        }
        if (inputToValidate.images === '') {
            errors.images ?
            errors.images = errors.images + " Images must not be empty," : 
            errors.images = " Images must not be empty,";
        }
        if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(inputToValidate.images)) {
            errors.images ?
            errors.images = errors.images + " Images must be a valid link," :
            errors.images = " Images must be a valid link,";
        }
        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            alert('Please, verify the provided information');
        } else if (!input.title || !input.description || input.price === '' || input.rating === '' || input.stock === '' || !input.brand || input.categories.length === 0 || !input.thumbnail || !input.images) {
            alert('Please, complete all fields before submitting');
        } else {
            console.log(`Producto a agregar:`);
            console.dir(input);
            dispatch(postProduct(input));
            alert('Product created!');
            setInput({
                title: '',
                description: '',
                price: 0,
                rating: 0,
                stock: 0,
                brand: '',
                categories: [],
                thumbnail: '',
                images: '',
                active: true
            });

            history.push('/home');
        }
    }

    return (
        <div>
            <Link to='/home'>Volver atrás...</Link>
            <h1>Formulario de Creación de Nuevo Producto</h1>
            <form>
                <div>
                    <label htmlFor="">Título:</label>
                    <input placeholder="Título del producto..." value={input.title} name="title" type="text" onChange={(e) =>handleInputChange(e)} />
                    {errors.title && <span>*{errors.title}</span>}
                    <label htmlFor="">Descripción:</label>
                    <textarea placeholder="Descripción..." value={input.description} name="description" onChange={(e) =>handleInputChange(e)} />
                    {errors.description && <span>*{errors.description}</span>}
                    <label htmlFor="">Precio:</label>
                    <input placeholder="00" value={input.price} name="price" type="text" onChange={(e) =>handleInputChange(e)} />
                    {errors.price && <span>*{errors.price}</span>}
                    <label htmlFor="">Rating:</label>
                    <input placeholder="0 a 5" value={input.rating} name="rating" type="number" onChange={(e) =>handleInputChange(e)} />
                    {errors.rating && <span>*{errors.rating}</span>}
                    <label htmlFor="">Stock:</label>
                    <input placeholder="0" value={input.stock} name="stock" type="number" onChange={(e) =>handleInputChange(e)} />
                    {errors.stock && <span>*{errors.stock}</span>}
                    <label htmlFor="">Marca:</label>
                    <input placeholder="Marca..." value={input.brand} name="brand" type="text" onChange={(e) =>handleInputChange(e)} />
                    {errors.brand && <span>*{errors.brand}</span>}
                    <label htmlFor="">Categorías:</label>
                    {categories?.map((category, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" value={category.name} id={category.name} onChange={(e) => {handleCheckBoxChange(e)}} />
                                    <label  htmlFor={category.name}>{category.name}</label>
                                </div>
                            )
                        })}
                        {errors.categories && <span>*{errors.categories}</span>}

                        <p>Categorías del producto seleccionadas: {input.categories.map((category) => {
                            return `${category}, `;
                        })}</p>
                    <label htmlFor="">Link imagen miniatura:</label>
                    <input placeholder="https://..." value={input.thumbnail} name="thumbnail" type="text" onChange={(e) =>handleInputChange(e)} />
                    {errors.thumbnail && <span>*{errors.thumbnail}</span>}
                    <label htmlFor="">Imagen del Producto:</label>
                    <input placeholder="https://..." value={input.images} name="images" type="text" onChange={(e) =>handleInputChange(e)} />
                    {errors.images && <span>*{errors.images}</span>}
                    <button onClick={(e) => {handleSubmit(e)}}>Crear Producto</button>
                </div>
            </form>
        </div>
    )
}