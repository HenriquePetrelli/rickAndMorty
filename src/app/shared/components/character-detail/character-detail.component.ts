import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Helper } from 'src/app/utils/helper';
import { CharacterService } from '../../services/character.service';
import { HomeComponent } from '../home/home.component';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  id: string | null;
  //character
  character: {} = {};
  characterImage: string | undefined;
  aboutDescription: string | undefined;
  //origin
  originDimension: string | undefined;
  originName: string | undefined;
  originType: string | undefined;
  originResidents: number | undefined;
  //location
  locationType: string | undefined;
  locationName: string | undefined;
  locationDimension: string | undefined;
  locationResidents: number | undefined;

  constructor(private route: ActivatedRoute,
    private characterService: CharacterService,
    private helper: Helper,
    private searchFormComponent: SearchFormComponent,
    private homeComponent: HomeComponent) {
    this.id = localStorage.getItem("id");
  }

  async ngOnInit() {
    await this.getCharacterAbout();
  }

  closeDetailCard() {
    this.searchFormComponent.showCharacterDetails = false;
  }

  async getCharacterAbout() {
    if (!this.id) return;
    (await this.characterService.getCharacterDetailsById(this.id)).subscribe(async (result: any) => {
      let lastSeenDate;
      if (!result) {
        this.helper.showToastMsg("Details not found!", "", 4500);
        return;
      }
      this.character = result;
      this.characterImage = result.image
      await this.originDescriptionConstructor(result.origin.url);
      await this.locationDescriptionConstructor(result.location.url);

      let epNumber = this.helper.returnSplitUrlApi(result.episode[result.episode.length - 1]);
      (await this.characterService.getLastEpisode(+epNumber)).subscribe(async (episode: any) => {
        if (!episode) {
          this.helper.showToastMsg("Episode not found!", "", 4500);
          return;
        }
        lastSeenDate = episode.air_date;
        this.aboutDescription = await this.aboutDescriptionContructor(result, lastSeenDate);
      }, error => {
        let msgError = this.helper.returnMsgToRequest(error);
        this.helper.showToastMsg(msgError.friendlyMessage, "", 4500);
      });
    }, error => {
      let msgError = this.helper.returnMsgToRequest(error);
      this.helper.showToastMsg(msgError.friendlyMessage, "", 4500);
    });
  }

  async aboutDescriptionContructor(result: { name: string, gender: string, species: string, status: string, episode: [] }, lastSeenDate: any) {
    let reference = "";
    let status = "";
    switch (result.gender) {
      case "Male":
        reference = "He";
        break;

      case "Female":
        reference = "She";
        break;

      case "unknown":
        reference = "It";
        break;

      default:
        reference = "It";
        break;
    }

    switch (result.status) {
      case "Alive":
        status = "is alive and well";
        break;

      case "Dead":
        reference = "is dead and buried";
        break;

      case "unknown":
        reference = "was not found";
        break;

      default:
        reference = "was not found";
        break;
    }
    let lastSeen = "";
    if (!lastSeenDate || lastSeenDate == "unknown")
      lastSeen = "Hasn't been seen again";
    else
      lastSeen = "Last seen in " + lastSeenDate;

    return `${result.name} is a ${result.gender} ${result.species}. ${reference} ${status}. ${lastSeen}`;
  }

  async originDescriptionConstructor(urlOrigin: string) {
    if (!urlOrigin) {
      this.originType = "unknown";
      this.originName = "unknown";
      this.originDimension = "unknown";
      this.originResidents = 0;
      return;
    }
    let originId = this.helper.returnSplitUrlApi(urlOrigin);
    (await this.characterService.getCharacterLocationById(+originId)).subscribe(async (origin: any) => {
      if (!origin) {
        this.helper.showToastMsg("Location not found!", "", 4500);
        return;
        return;
      }
      this.originType = origin.type;
      this.originName = origin.name;
      this.originDimension = origin.dimension;
      this.originResidents = origin.residents.length;
      if (!origin.residents.length)
        this.originResidents = 0;
    }, error => {
      let msgError = this.helper.returnMsgToRequest(error);
      this.helper.showToastMsg(msgError.friendlyMessage, "", 4500);
    });
  }

  async locationDescriptionConstructor(urlLocation: string) {
    if (!urlLocation) {
      this.locationType = "unknown";
      this.locationName = "unknown";
      this.locationDimension = "unknown";
      this.locationResidents = 0;
      return;
    }
    let locationId = this.helper.returnSplitUrlApi(urlLocation);
    (await this.characterService.getCharacterLocationById(+locationId)).subscribe(async (location: any) => {
      if (!location) {
        this.helper.showToastMsg("Location not found!", "", 4500);
        return;
      }
      this.locationType = location.type;
      this.locationName = location.name;
      this.locationDimension = location.dimension;
      this.locationResidents = location.residents.length;
      if (!location.residents.length)
        this.locationResidents = 0;
    }, error => {
      let msgError = this.helper.returnMsgToRequest(error);
      this.helper.showToastMsg(msgError.friendlyMessage, "", 4500);
    });
  }




}
