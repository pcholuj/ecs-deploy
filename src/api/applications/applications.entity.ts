import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
// import { IsDate, IsAlphanumeric } from 'class-validator';
// import { ConversionParams } from './tasks.validator';

@Entity('applications')
// @Index('tasks_apikey_name_index', ['flow', 'name'], { unique: true })
export class Applications {

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
      default: false,
  })
  public auto: boolean;

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
