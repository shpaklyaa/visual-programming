import React, { useState, useEffect, useReducer } from 'react';
import DataSet from './DataSet';
import './DataTable.css';

const initialState = {
  comments: [],
  loading: true,
  error: null,
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload, loading: false };
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    case 'DELETE_COMMENTS':
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => !action.payload.includes(comment.id)
        ),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

const DataTable = ({ endpoint }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (endpoint.endsWith('/users')) {
          const formattedData = data.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
          }));
          dispatch({ type: 'SET_COMMENTS', payload: formattedData });
        } else {
          dispatch({ type: 'SET_COMMENTS', payload: data });
        }
      })
      .catch((error) => dispatch({ type: 'SET_ERROR', payload: error.message }));
  }, [endpoint]);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>{state.error}</p>;

  const headers = Object.keys(state.comments[0] || {}).map((key) => ({
    property: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

  // Функция для добавления элемента
  const handleAddItem = (newItem, endpoint) => {
    const maxId =
      newItem.id || (state.comments.length > 0 ? Math.max(...state.comments.map((item) => item.id)) + 1 : 1);
    const optimisticItem = { ...newItem, id: maxId };

    dispatch({ type: 'ADD_COMMENT', payload: optimisticItem });

    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при добавлении элемента');
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: 'UPDATE_COMMENT', payload: { ...data, id: optimisticItem.id } });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: 'DELETE_COMMENTS',
          payload: [optimisticItem.id],
        });
      });
  };

  // Функция для удаления элементов
  const handleDeleteItems = (selectedIds, endpoint) => {
    dispatch({ type: 'DELETE_COMMENTS', payload: selectedIds });

    selectedIds.forEach((id) => {
      if (typeof id !== 'number') return; // Пропускаем временные элементы
      fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      }).catch((error) => {
        console.error(error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      });
    });
  };

  // Функция для обновления элемента
  const handleUpdateItem = (updatedItem, endpoint) => {
    dispatch({ type: 'UPDATE_COMMENT', payload: updatedItem });

    fetch(`${endpoint}/${updatedItem.id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedItem),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при обновлении элемента');
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: 'UPDATE_COMMENT', payload: data });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      });
  };

  return (
    <div>
      <h1>{endpoint.split('/').pop().toUpperCase()}</h1>
      <DataSet
        headers={headers}
        data={state.comments}
        onAdd={(newItem) => handleAddItem(newItem, endpoint)}
        onDelete={(selectedIds) => handleDeleteItems(selectedIds, endpoint)}
        onUpdate={(updatedItem) => handleUpdateItem(updatedItem, endpoint)}
      />
    </div>
  );
};

export default DataTable;