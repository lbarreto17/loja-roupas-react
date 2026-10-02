import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore"

import { db } from "../firebase"

function carrinhoRef(uid) {
  return collection(db, "usuarios", uid, "carrinho")
}

export async function adicionarProduto(uid, produto, tamanho) {
  const item = {
    produtoId: produto.id,
    nome: produto.nome,
    preco: produto.preco,
    imagem: produto.imagem,
    tamanho: tamanho,
    quantidade: 1
  }

  await addDoc(carrinhoRef(uid), item)
}

export async function buscarCarrinho(uid) {
  const snapshot = await getDocs(carrinhoRef(uid))

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }))
}

export async function atualizarQuantidade(uid, itemId, quantidade) {
  const itemRef = doc(
    db,
    "usuarios",
    uid,
    "carrinho",
    itemId
  )

  await updateDoc(itemRef, {
    quantidade: quantidade
  })
}

export async function removerProduto(uid, itemId) {
  const itemRef = doc(
    db,
    "usuarios",
    uid,
    "carrinho",
    itemId
  )

  await deleteDoc(itemRef)
}