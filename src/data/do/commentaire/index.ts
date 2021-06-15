import { BeforeInsert, Column, Entity, getConnection, JoinColumn, JoinTable, ManyToOne, ObjectID, ObjectIdColumn, RelationId } from 'typeorm';
import { UtilisateurDO } from '../utilisateur/utilisateur.do';

@Entity('commentaire')
export class CommentaireDO {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  commentaire: string;

  @ManyToOne(() => UtilisateurDO, user => user.id, { cascade: true })
  @JoinColumn({ name: 'owner' })
  @JoinTable({ name: 'utilisateur' })
  owner: UtilisateurDO;

  @Column({ type: 'timestamptz' })
  dateCreation: Date;

  @BeforeInsert()
  async beforeInsert() {
    this.dateCreation = new Date();
  }
}
