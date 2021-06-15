import { formatToShortFormat } from '../../../common/service/date.service';
import { GenericSA } from '../../../common/service/generic.sa';
import {
  utilisateurFactory,
  UtilisateurFactory,
} from '../../../constraint/factory/utilisateur/utilisateur.factory';
import { HttpStatus } from '../../../data/constants/http-status';
// import { utilisateur } from '../../../data/constants/urls';
import { UtilisateurDO } from '../../../data/do/utilisateur/utilisateur.do';
import { UtilisateurEditRequestDTO } from '../../../data/dto/utilisateur/utilisateur-edit-request.dto';
import { UtilisateurRequestDTO } from '../../../data/dto/utilisateur/utilisateur-request.dto';
import { UtilisateurResponseDTO } from '../../../data/dto/utilisateur/utilisateur-response.dto';
import { utilisateurBDL } from '../../bdl/utilisateur/utilisateur.bdl';
import { utilisateurSM, UtilisateurSM } from '../../metier/utilisateur/utilisateur.sm';
import { Exception } from '../../middleware/exception-handler';

const sortFieldMapper = {
  nomPrenom: 'nom',
};

export class UtilisateurSA extends GenericSA<
  UtilisateurDO,
  UtilisateurRequestDTO,
  UtilisateurResponseDTO,
  UtilisateurSM,
  UtilisateurFactory
> {
  async editUtilisateur(dto: UtilisateurEditRequestDTO) {
    try {
      await this.updateOdoo(dto);
      return this.partialUpdate(dto.id, dto);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async updateOdoo(dto) {
    try {
      const { email, telephone, id } = dto;
      const odooDTO = this.factory.toOdooRequestDTO(dto);
      const utilisateurByEmail = await this.serviceSM.findOneNotFail({ email });
      const utilisateurByPhone = await this.serviceSM.findOneNotFail({ telephone });

      if (utilisateurByEmail && utilisateurByEmail.id !== id) {
        throw new Exception(HttpStatus.BAD_REQUEST, 'Email déjà existant');
      }

      if (utilisateurByPhone && utilisateurByPhone.id !== id) {
        throw new Exception(HttpStatus.BAD_REQUEST, 'Numéro téléphone existant');
      }

      return utilisateurBDL.update(odooDTO);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async partialUpdate(id: string, partialEntity): Promise<any> {
    try {
      await this.updateOdoo({
        ...partialEntity,
        bo_id: id,
      });

      const result = await this.serviceSM.update(id, partialEntity);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  updateSocketId(id: string, socketId: string) {
    return this.serviceSM.update(id, { socketId });
  }

  async changeUtilisateurStatus(utilisateurId: string, actif) {
    try {
      const result = await this.serviceSM.update(utilisateurId, { actif });
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async resetPassword(utilisateurId: string, password: string) {
    try {
      const utilisateurDO = await this.serviceSM.update(utilisateurId, { password });

      return this.factory.toResponseDto(utilisateurDO);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(options) {
    const {
      sortField: oldSortField,
      queries: { nom, ville },
    } = options;
    const newOptions = {
      ...options,
      sortField: sortFieldMapper[oldSortField] || oldSortField,
      ...(nom ? { queries: { nom, ville, prenom: nom } } : { ville }),
    };

    try {
      const { take, skip } = newOptions;
      const [dos, totalCount] = await this.serviceSM.findAll(
        {
          take,
          skip,
        },
        this.name,
      );
      const items = this.factory.toResponseDto(dos);

      return {
        items,
        totalCount,
        ...(!Number.isNaN(take) && !Number.isNaN(skip)
          ? { hasNext: take * (skip / take + 1) < totalCount }
          : {}),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(id: string, toDto = true) {
    try {
      const utilisateur = await this.serviceSM.findById(id);

      return toDto ? this.factory.toBODTO(utilisateur) : utilisateur;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getCins(id: string) {
    try {
      const utilisateur = await this.serviceSM.findById(id);

      return this.factory.toCinResponseDTO(utilisateur);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getDateInscription(minDate: string, maxDate: string) {
    try {
      const data = await this.serviceSM.getDateInscription(minDate, maxDate);

      return data.map(({ dateCreation }) => formatToShortFormat(dateCreation));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getSocketIdByUtilisateurId(id: string) {
    try {
      const utilisateur = await this.serviceSM.findOneNotFail({ id });

      return utilisateur?.socketId;
    } catch (error) {
      return Promise.resolve('');
    }
  }

  async getSocketIdByNotifToken(notifToken: string) {
    try {
      const utilisateur = await this.serviceSM.getSocketIdByNotifToken(notifToken);

      return utilisateur?.socketId;
    } catch (error) {
      return Promise.resolve('');
    }
  }

  async getSocketIdByTransactionId(transactionId: string) {
    try {
      const utilisateur = await this.serviceSM.getSocketIdByTransactionId(transactionId);

      return utilisateur?.socketId;
    } catch (error) {
      return Promise.resolve('');
    }
  }
}

export const utilisateurSA = new UtilisateurSA(utilisateurSM, utilisateurFactory, 'utilisateur');
