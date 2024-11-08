const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  if (!title || !body) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan catatan. Mohon lengkapi judul dan isi catatan.',
    }).code(400);
  }

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  if (notes.some(note => note.id === id)) {
    return h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    }).code(201);
  }

  return h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  }).code(500);
};

const getAllNotesHandler = (request, h) => {
  return h.response({
    status: 'success',
    data: {
      notes,
    },
  }).code(200);
};

module.exports = { addNoteHandler, getAllNotesHandler };
