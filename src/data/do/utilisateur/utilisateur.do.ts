import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { logger } from '../../../common/logger';
import { CommentaireDO } from '../commentaire';

@Entity('utilisateur')
export class UtilisateurDO {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ length: 50 })
  nom: string;

  @Column({ length: 100, nullable: true })
  prenom: string;

  @Column()
  imageUrl: string;

  @Column({ length: 10, nullable: true })
  telephone: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 25 })
  ville: string;

  @Column({ length: 50 })
  adresse: string;

  @Column()
  password: string;

  @Column({ type: 'timestamptz' })
  dateInscription: Date;

  @Column({ nullable: true })
  dateNaissance: string;

  @Column({ type: 'timestamptz', nullable: true })
  dateModification: Date;

  @Column({ type: 'timestamptz', nullable: true })
  dateDerniereConnexion: Date;

  @Column({ default: true })
  actif: boolean;

  @OneToMany(() => CommentaireDO, commentaire => commentaire.id, { cascade: true })
  @JoinColumn({ name: 'commentaires' })
  @JoinTable({ name: 'Commentaire' })
  commentaires: CommentaireDO[];

  @Column({ nullable: true })
  socketId: string;

  @BeforeInsert()
  async beforeInsert() {
    try {
      this.dateInscription = new Date();
      this.password = await bcrypt.hashSync(this.password, 10);
    } catch (error) {
      logger.error(error);
    }
  }

  @BeforeUpdate()
  async hashPasswordUpdate() {
    if (!this.password.includes('$2a$')) {
      this.password = await bcrypt.hashSync(this.password, 10);
    }

    this.dateModification = new Date();
  }
}
