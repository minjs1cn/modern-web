import { Base } from 'api/base/base.entity';
import { Entity, Column } from 'typeorm';

export enum UserStatus {
  NORMAL = 0,
  FORBIDDEN = 1,
}

@Entity()
export class User extends Base {
  @Column({
    type: 'varchar',
    length: 50,
  })
  name!: string;

  @Column({
    name: 'head_img_uri',
    type: 'varchar',
  })
  headImgUri!: string;

  @Column({
    type: 'varchar',
    length: 11,
  })
  mobile!: string;

  @Column({
    type: 'varchar',
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.NORMAL,
  })
  state!: UserStatus;
}
