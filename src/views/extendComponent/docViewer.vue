<template>
  <div class="main__docViewer markdown-body">
    <el-timeline>
      <el-timeline-item timestamp="pdf 预览" placement="top">
        <el-card>
          <div slot="header" class="card__header">
            <h3>使用 <a href="https://github.com/mozilla/pdf.js" target="_blank">pdf.js</a></h3>
            <el-button type="primary" @click="handleViewerPDF">预览 pdf</el-button>
          </div>
          <h3>Setup PDF.js in a website</h3>
          <p>PDF.js is a Portable Document Format (PDF) viewer that is built with HTML5.</p>
          <p>You can choose to use a pre-built version of PDF.js or build PDF.js from source.</p>
          <h4>With npm</h4>
          <p>Add the dependencies to your project:</p>
          <pre><code>npm install pdfjs-dist --save</code></pre>
          <p>To use the library in your project add 
            <code>require('pdfjs-dist')</code> 
            to your file requires and build your project normally. The worker shall be built into a separate bundle: take the file "./node_modules/pdfjs-dist/build/pdf.worker.entry.js" or built a separate file that uses 
            <code>require('pdfjs-dist/build/pdf.worker')</code>. 
            <code>PDFJS.workerSrc</code> 
            shall be set to point to this file. You can use the pdfjs-dist/webpack module for PDF.js autoconfiguration. Refer to https://github.com/mozilla/pdf.js/tree/master/examples/webpack for a complete example.
          </p>
        </el-card>
        <canvas id="theCanvas"></canvas>
      </el-timeline-item>
      <el-timeline-item timestamp="html to pdf" placement="top">
        <el-card>
          <h4>开发中</h4>
          <p>代码怎么写啊...</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="word 预览" placement="top">
        <el-card>
          <h4>开发中</h4>
          <p>代码怎么写啊...</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="图片预览" placement="top">
        <el-card>
          <h4>开发中</h4>
          <p>代码怎么写啊...</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import pdfjsLib from 'static/vendor/pdf.js';
const pdfPath = 'static/pdf/Google_JavaScript_编码规范指南.pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'static/vendor/pdf.worker.js';
export default {
  name: 'DocViewer',
  data() {
    return {

    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted() {
    
  },
  destroyed() {
    
  },
  methods: {
    handleViewerPDF() {
      var loadingTask = pdfjsLib.getDocument(pdfPath);
      loadingTask.promise.then(function (pdfDocument) {
        // Request a first page
        console.log('pdfDocument:', pdfDocument);
        return pdfDocument.getPage(1).then(function (pdfPage) {
          // Display page on the existing canvas with 100% scale.
          console.log('pdfPage:', pdfPage);
          var viewport = pdfPage.getViewport({ scale: 1.0, });
          console.log('viewport:', viewport);
          var canvas = document.getElementById('theCanvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          var ctx = canvas.getContext('2d');
          var renderTask = pdfPage.render({
            canvasContext: ctx,
            viewport: viewport,
          });
          return renderTask.promise;
        });
      }).catch(function (reason) {
        console.error('Error: ' + reason);
      });
    }
  }
}
</script>
<style scoped>
.main__docViewer .el-card .card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

