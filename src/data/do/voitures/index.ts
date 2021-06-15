import { BeforeInsert, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('voitures')
export class VoituresDO {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  refVoitures: string;

  @Column()
  nom: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'timestamptz' })
  dateCreation: Date;

  @BeforeInsert()
  beforeInsert() {
    this.dateCreation = new Date();
  }
}
