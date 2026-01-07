'use client'

import { useState, useEffect } from 'react';
import { Character } from '@/types/character';

export default function CharacterCRUD() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [profession, setProfession] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Daten laden
  const fetchCharacters = async () => {
    const res = await fetch('http://localhost:8080/api/asterix/characters');
    const data: Character[] = await res.json();
    setCharacters(data);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  // Create / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !profession) return;

    const payload = { name, age, profession };

    if (editingId) {
      await fetch(`http://localhost:8080/api/asterix/characters/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setEditingId(null);
    } else {
      await fetch('http://localhost:8080/api/asterix/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchCharacters();
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8080/api/asterix/characters/${id}`, {
      method: 'DELETE',
    });
    fetchCharacters();
  };

  const handleEdit = (character: Character) => {
    setEditingId(character.id);
    setName(character.name);
    setAge(character.age);
    setProfession(character.profession);
  };

  const resetForm = () => {
    setName('');
    setAge(null);
    setProfession('');
    setEditingId(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Asterix Charactere CRUD</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          value={age ?? ''}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Alter"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          placeholder="Beruf"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editingId ? 'Update Character' : 'Neuer Character'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
            >
              Abbrechen
            </button>
          )}
        </div>
      </form>

      {/* LISTE */}
      <ul className="space-y-2">
        {characters.map((character) => (
          <li
            key={character.id}
            className="flex justify-between items-center p-3 border rounded-md"
          >
            <div>
              <p className="font-medium">{character.name}</p>
              <p className="text-gray-500 text-sm">Alter: {character.age}</p>
              <p className="text-gray-500 text-sm">Beruf: {character.profession}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(character)}
                className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
              >
                Editieren
              </button>
              <button
                onClick={() => handleDelete(character.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Löschen
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
