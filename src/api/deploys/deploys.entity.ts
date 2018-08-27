import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
// import { IsDate, IsAlphanumeric } from 'class-validator';
// import { ConversionParams } from './tasks.validator';

@Entity('deploys')
export class Deploys {

  @ApiModelPropertyOptional()
  @PrimaryGeneratedColumn()
  public id: string;

  @ApiModelProperty()
  @Column()
  public name: string;

  @ApiModelProperty()
  @Column()
  public type: string;

  @ApiModelProperty()
  @Column()
  public env: string;

  @ApiModelProperty()
  @Column()
  public status: number;

  @ApiModelProperty()
  @Column({
      type: 'jsonb',
  })
  public config: any;

  @ApiModelProperty()
  @Column({
      type: 'text',
      nullable: true,
  })
  public tag: string;

  @ApiModelProperty()
  @Column({
    type: 'text',
  })
  public branch: string;

  @ApiModelProperty()
  @Column({
    type: 'text',
  })
  public notes: string;

  @ApiModelPropertyOptional()
  @CreateDateColumn({
    name: 'created',
    type: 'timestamp',
  })
  public created: Date;

  @ApiModelPropertyOptional()
  @UpdateDateColumn({
    name: 'updated',
    type: 'timestamp',
  })
  public updated: Date;

}
