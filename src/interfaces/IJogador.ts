import { IEndereco } from "./IEndereco";

export interface IJogador {
    id?: string;
    imagem: string;
    nome: string;
    idade: number;
    posicao: string;
    altura: number;
    peso: number;
    habilidade?: number;
    velocidade?: number;
    forca?: number;
    yellowCards?: number;
    redCards?: number;
    endereco?:IEndereco;
}