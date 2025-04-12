<script lang="ts">
  let { children } = $props();
</script>

<div id="iphone-x">
  <div class="device device-iphone-x">
    <div class="device-frame">
      <div class="device-content">
        {@render children()}
        <!-- <iframe id="newsletter-demo" src="http://sayemtutorial.blogspot.com" frameborder="0"></iframe> -->
      </div>
      <div class="device-stripe"></div>
      <!-- <div class="device-header"></div> -->
      <!-- <div class="device-sensors"></div> -->
      <div class="device-btns"></div>
      <div class="device-power"></div>
      <div class="device-home"></div>
    </div>
  </div>
</div>

<style>
  .device,
  .device *,
  .device:after,
  .device :after,
  .device:before,
  .device :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
  }
  #iphone-x {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .device {
    position: relative;
  }
  .device,
  .device .device-frame {
    z-index: 1;
  }
  .device-iphone-x {
    text-align: center;
  }
  .device-iphone-x .device-frame {
    background: #222;
    border-radius: 50px;
    -webkit-box-shadow:
      inset 0 0 2px 0 #c8cacb,
      inset 0 0 0 3px #e2e3e4;
    box-shadow:
      inset 0 0 2px 0 #c8cacb,
      inset 0 0 0 3px #e2e3e4;
    height: 690px;
    width: 330px;
    padding: 9px;
  }
  .device .device-content {
    background-color: #fff;
    background-position: 50%;
    background-size: cover;
    -o-object-fit: cover;
    object-fit: cover;
    position: relative;
    border-radius: 40px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .device-iphone-x .device-stripe:after,
  .device-iphone-x .device-stripe:before {
    border: solid rgba(51, 51, 51, 0.25);
    border-width: 0 7px;
    content: '';
    height: 7px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 9;
  }
  .device-iphone-x .device-stripe:after {
    top: 85px;
  }
  .device-iphone-x .device-stripe:before {
    bottom: 85px;
  }

  .device-iphone-x .device-btns {
    background: #c8cacb;
    height: 32px;
    left: -3px;
    position: absolute;
    top: 115px;
    width: 3px;
  }
  .device-iphone-x .device-btns:after,
  .device-iphone-x .device-btns:before {
    background: #c8cacb;
    content: '';
    height: 62px;
    left: 0;
    position: absolute;
    width: 3px;
  }
  .device-iphone-x .device-btns:after {
    top: 60px;
  }
  .device-iphone-x .device-btns:before {
    top: 140px;
  }
  .device-iphone-x .device-power {
    background: #c8cacb;
    height: 100px;
    position: absolute;
    right: -3px;
    top: 200px;
    width: 3px;
  }
</style>
